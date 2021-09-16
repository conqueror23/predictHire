const getDbListQuery = async (client: any) => {
  const dbList = await client.db().admin().listDatabases();
  return dbList;
};

const insertDocQuery = async (client: any) => {
  try {
    const result = await client
      .db(MONGO_DBNAME)
      .collection(collectionName)
      .insertOne(content);
    return result;
  } catch (e) {
    console.log("error in create docs", e);
  }
};


  const findAllQuery = async (client:any) => {
      try {
        const result = await client
          .db(MONGO_DBNAME)
          .collection(collectionName)
          .find()
          .toArray();
        return result;
      } catch (e) {
        console.log("error in findAllDocs", e);
      }
  };



export { getDbListQuery,insertDocQuery,findAllQuery}
