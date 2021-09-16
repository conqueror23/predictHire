import { MongoClient } from "mongodb";

const dotenv = require("dotenv");
const ENV = dotenv.config().parsed;
const { MONGO_URI, MONGO_DBNAME } = ENV;

const connectMongo = async (cb:Function) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    return await cb(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

interface CompanyInfo {
  name: string;
  address: string;
}

const createDocument = async (
  collectionName: string,
  content: any
) => {

    const insertDocQuery=async (client:any)=>{
      try {
        const result = await client
          .db(MONGO_DBNAME)
          .collection(collectionName)
          .insertOne(content);
        return result;
      } catch (e) {
        console.log("error in create docs", e);
      }
    }

    return connectMongo(insertDocQuery)
};

const findAllDocs = async (collectionName: string,filters:Object) => {

  const findAllQuery = async (client:any) => {
      try {

        const result = await client
          .db(MONGO_DBNAME)
          .collection(collectionName)
          .find(filters)
          .toArray();
        return result;
      } catch (e) {
        console.log("error in findAllDocs", e);
      }
  };

  return connectMongo(findAllQuery);
};

export {  findAllDocs, createDocument };
