import { app } from "../";
import { findAllDocs, createDocument } from "../mongo";

const dotenv =require('dotenv')
const ENV = dotenv.config().parsed
const {MONGO_COLLECTION} = ENV

app.get("/", async (req, res) => {
  try {
    const data = await findAllDocs(MONGO_COLLECTION);
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

(async () => {
  const data = await findAllDocs("company");
    // const tempCompany ={"name":"Amazing","address":"earth"}
  // const data = await createDocument("company",tempCompany)

  console.log("requested data", JSON.stringify(data));
})();
