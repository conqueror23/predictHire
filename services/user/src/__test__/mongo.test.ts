import {
  findAllDocs,
  createDocument,
  upsertDoc,
  deleteDoc,
  dropCollection,
} from "../mongo";
import { getSetParam } from "../utils";
import { ObjectId } from "mongodb";
import { server } from "../config";
import {role} from '../types'
const { MONGO_URI, MONGO_DBNAME, MONGO_Collection } =
  require("dotenv").config().parsed;

describe("test for mongo operations", () => {

  let mockDoc  = {
    companyId: new ObjectId("5e5df7fc6953acd3dc50fe8f"),
    name: "Bob Markle",
    username: "bob",
    password: "bob",
    role : role.user,
  };
  const testCollection = "user-test";
  let mockDockId = "";
  let mockFilter = {
    companyId: { $eq: mockDoc.companyId },
    name: { $eq: mockDoc.name },
    username: { $eq: mockDoc.username },
    password: { $eq: mockDoc.password },
    role: { $eq: mockDoc.role },
  };

  let idFilter = { _id: {} };

  it("ensure there are no similiar record-- before insert", async () => {
    await dropCollection(testCollection);
    const insertedDoc = await findAllDocs(testCollection, mockFilter);
    expect(insertedDoc.length).toBe(0);
  });

  it("insert one record with mockup data -- test", async () => {
    const createResult = await createDocument(testCollection, mockDoc);
    expect(createResult).toHaveProperty("insertedId");
    mockDockId = createResult.insertedId;
  });

  it("check if that record was inserted correctly-- after insert", async () => {
    const insertedDoc = await findAllDocs(testCollection, mockFilter);
    expect(insertedDoc.length).toBe(1);
    expect(insertedDoc[0]).toStrictEqual(mockDoc);
  });

  it("upsert info that change part document -- after insert", async () => {
    mockDoc.name = "upsertName";
    idFilter._id = new ObjectId(mockDockId);
    const setParam = getSetParam(mockDoc);
    const upsertResult = await upsertDoc(testCollection, idFilter, setParam);
    expect(upsertResult).toHaveProperty("upsertedId");
  });

  it("check if that record was updated -- afterUpsertdoc", async () => {
    const insertedDoc = await findAllDocs(testCollection, idFilter);
    expect(insertedDoc.length).toBeGreaterThan(0);
    expect(insertedDoc[0]).toStrictEqual(mockDoc);
  });

  it("delete that record --after upsert and find", async () => {
    const deleteResult = await deleteDoc(testCollection, mockDoc);
    expect(deleteResult).toHaveProperty("deletedCount");
    expect(deleteResult.deletedCount).toBeGreaterThan(0);
  });

  it("check if the record has been deleted", async () => {
    mockFilter = {
      companyId: { $eq: mockDoc.companyId},
      name: { $eq: mockDoc.name },
      username: { $eq: mockDoc.username },
      password: { $eq: mockDoc.password },
      role: { $eq: mockDoc.role },
    };
    const findResult = await findAllDocs(testCollection, mockFilter);
    expect(findResult.length).toBe(0);
  });
  afterAll((done) => {
    server.close();
    done();
  });
});
