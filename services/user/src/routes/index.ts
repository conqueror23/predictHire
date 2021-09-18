import { app } from "../";
import { findAllDocs, createDocument, upsertDoc, deleteDoc } from "../mongo";
import { Request, Response, Application } from "express";
import { UserFilterParam } from "../types";
import { ObjectId } from "mongodb";
import {getSetParam} from '../utils'

//import seems not working with dotenv
const dotenv = require("dotenv");
const { MONGO_COLLECTION ,MONGO_DBNAME} = dotenv.config().parsed;


// add site live notice
app.get("/", (req: Request, res: Response) => {
  res.write("<html>");
  res.write("<body>");
  res.write(`<h1>${MONGO_DBNAME}</h1>`);
  res.write("</body>");
  res.write("</html>");
  res.end();
});

//get all docs
app.get("/findAll", async (req: Request, res: Response) => {
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

// create filter by using info from request
const getFilter = (params: string): Partial<UserFilterParam> => {
  const filterParam: any = {};
  const filters = params.split("&");
  filters.forEach((filter: any) => {
    const [key, value] = filter.split("=");
    // object Id need bit converts
    if (key == "_id"||key=='companyId') {
      filterParam[key] = new ObjectId(value);
    } else {
      filterParam[key] = { $eq: value };
    }
  });

  return filterParam;
};

// find document based on filter params
app.get("/find/:filterParams", async (req: Request, res: Response) => {
  try {
    const { filterParams } = req.params;
    const filter = getFilter(filterParams);
    const data = await findAllDocs(MONGO_COLLECTION, filter);
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

//post and create a new doc
app.post("/createDocument", async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      res.send({
        status: 422,
        message: "input lack one or two field",
      });
      return;
    }
    const data = await createDocument(MONGO_COLLECTION, { name, address });
    res.send({
      status: 200,
      message: data,
    });
  } catch (e) {
    console.log("error in createDocument", e);
    res.send({
      status: 500,
      message: "server error",
    });
  }
});


//update document by _id which is more secury and easy to find
app.put("/updateById", async (req: Request, res: Response) => {
  try {
    // this means it has to have an valid _id
    const { _id, ...content }:Partial<UserFilterParam> = req.body;
    if (!_id) {
      res.send({
        status: 422,
        message: "_id is required",
      });
      return;
    }

    const filter = getFilter(`_id=${_id}`);
    const setParam = getSetParam(content);

    const data = await upsertDoc(MONGO_COLLECTION, filter, setParam);
    res.send({
      status: 200,
      message: data,
    });
  } catch (e) {
    console.log("error in '/updatebyId' put route", e);
    res.send({
      status: 500,
      message: "server error",
    });
  }
});

// deleteDoc
app.delete("/deleteById", async (req: Request, res: Response) => {
  try {
    const { _id }= req.body;
    if (!_id) {
      res.send({
        status: 422,
        message: "_id is required",
      });
      return;
    }
    const filter = getFilter(`_id=${_id}`);
    const data = await deleteDoc(MONGO_COLLECTION, filter);
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

