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
      return await client
          .db(MONGO_DBNAME)
          .collection(collectionName)
          .insertOne(content);
      } catch (e) {
        console.log("error in create docs", e);
      }
    }

    return connectMongo(insertDocQuery)
};

const findAllDocs = async (collectionName: string,filters:Object) => {

  const findAllQuery = async (client:any) => {
      try {
        return await client
          .db(MONGO_DBNAME)
          .collection(collectionName)
          .find(filters)
          .toArray();
      } catch (e) {
        console.log("error in findAllDocs", e);
      }
  };

  return connectMongo(findAllQuery);
};


const updateOneDoc= async (collectionName:string,filter:Object,content:Object)=>{
    const updateQuery = async(client:any)=>{
        try{
            return await client.db(MONGO_DBNAME).collection(collectionName).updateOne(filter,content)

        }catch(e){
            console.log('error in updateQuery',e)
        }
    }
    return connectMongo(updateQuery)
}


const upsertDoc=async (collectionName:string,filter:Object,content:Object)=>{
    const upsertQuery = async (client:any)=>{
        try{
            return await client.db(MONGO_DBNAME).collection(collectionName).updateOne(filter,content,{upsert:true})

        }catch(e){
            console.log('error in updateQuery',e)
        }
    }
    return connectMongo(upsertQuery)
}

const deleteDoc= async (collectionName:string,content:Object)=>{
    const deleteQuery = async(client:any)=>{
        try{
            return client.db(MONGO_DBNAME).collection(collectionName).deleteOne(content)

        }catch(e){
            console.log('error in  deleteQuery',e)
        }
    }
    return connectMongo(deleteQuery)
}

export {  findAllDocs, createDocument ,updateOneDoc,upsertDoc,deleteDoc};
