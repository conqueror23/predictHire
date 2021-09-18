import { app } from "../";
import { findAllDocs, createDocument,updateOneDoc,deleteDoc} from "../mongo";

const dotenv = require("dotenv");
const ENV = dotenv.config().parsed;
const { MONGO_COLLECTION } = ENV;

app.get("/", async (req, res) => {
  try {
    const data = await findAllDocs(MONGO_COLLECTION, {});
    res.send({
      status: 200,
      message: data,
    });
  } catch (e) {
    console.log("error in '/' get route", e);
    res.send({
      status: 500,
      message: "server error",
    });
  }
});

app.get("/find/:document", async (req, res) => {
  const { document } = req.params;
  console.log(document)
  try {
    const data = await findAllDocs(MONGO_COLLECTION, {});
    res.send({
      status: 200,
      message: data,
    });
  } catch (e) {
    console.log("error in '/' get route", e);
    res.send({
      status: 500,
      message: "server error",
    });
  }
});

// (async () => {
//   const data = await findAllDocs(MONGO_COLLECTION,{} );

  // const data = await findAllDocs(MONGO_COLLECTION, {"name":{$eq:"amazong"}});
  // const data = await deleteDoc(MONGO_COLLECTION,{"name":"test-three"})

//   const filter= {"name":{$eq:"hi there"}}
//   const newContent = {$set:{"name":"amazong"}}
//   const data = await updateOneDoc(MONGO_COLLECTION,filter,newContent)

  // const tempCompany ={"name":"Amazing","address":"earth"}
  // const data = await createDocument("company",tempCompany)

  // console.log("requested data", JSON.stringify(data));
// })();
