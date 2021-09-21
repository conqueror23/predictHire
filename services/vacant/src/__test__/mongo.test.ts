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
const { MONGO_URI, MONGO_DBNAME, MONGO_Collection } =
  require("dotenv").config().parsed;

describe("test for mongo operations", () => {
  let mockDoc = {
    title: "vac1",
    description: "a maazong wonderful work",
    expiredAt: "2020-02-21",
  };
  const testCollection = "vacant-test";
  let mockDockId = "";
  let mockFilter = {
    title: { $eq: mockDoc.title },
    description: { $eq: mockDoc.description },
    expiredAt: { $eq: mockDoc.expiredAt },
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
    const insertedDoc = await findAllDocs(testCollection, mockDoc);
    expect(insertedDoc.length).toBe(1);
    expect(insertedDoc[0]).toStrictEqual(mockDoc);
  });

  it("upsert info that record -- after insert", async () => {
    mockDoc.title = "upsertName";
    idFilter._id = new ObjectId(mockDockId);
    const setParam = getSetParam(mockDoc);

    const upsertResult = await upsertDoc(testCollection, idFilter, setParam);
    expect(upsertResult).toHaveProperty("upsertedId");
  });

  it("check if that record was updated -- afterUpsertdoc", async () => {
    const insertedDoc = await findAllDocs(testCollection, idFilter);
    expect(insertedDoc.length).toBeGreaterThan(0);
    expect(insertedDoc[0].title).toBe(mockDoc.title);
  });

  it("delete that record --after upsert and find", async () => {
    const deleteResult = await deleteDoc(testCollection, mockDoc);
    expect(deleteResult).toHaveProperty("deletedCount");
    expect(deleteResult.deletedCount).toBeGreaterThan(0);
  });

  it("check if the record has been deleted", async () => {
    mockFilter = {
    title: { $eq: mockDoc.title },
    description: { $eq: mockDoc.description },
    expiredAt: { $eq: mockDoc.expiredAt },
    };
    const findResult = await findAllDocs(testCollection, mockFilter);
    expect(findResult.length).toBe(0);
  });
  afterAll((done) => {
    server.close();
    done();
  });
});
