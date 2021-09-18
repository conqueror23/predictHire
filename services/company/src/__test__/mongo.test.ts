import {
  findAllDocs,
  createDocument,
  upsertDoc,
  deleteDoc,
  dropCollection
} from "../mongo";
import {getSetParam} from '../utils'
import { ObjectId } from "mongodb";
const { MONGO_URI, MONGO_DBNAME, MONGO_Collection } =
  require("dotenv").config().parsed;

describe("test for mongo operations", () => {
  let mockDoc = { name: "test-com", address: "test-address" };
  const testCollection = "company-test";
  let mockDockId="";
  let mockFilter = {
    name: { $eq: mockDoc.name },
    address: { $eq: mockDoc.address },
  };
  let idFilter ={"_id":{}};

  it("ensure there are no similiar record-- before insert", async () => {
      await dropCollection(testCollection);
    const insertedDoc = await findAllDocs(testCollection, mockFilter);
    expect(insertedDoc.length).toBe(0);
  });

  it("insert one record with mockup data -- test", async () => {
    const createResult = await createDocument(testCollection, mockDoc);
    expect(createResult).toHaveProperty("insertedId");
    mockDockId = createResult.insertedId
  });

  it("check if that record was inserted correctly-- after insert", async () => {
    const insertedDoc = await findAllDocs(testCollection, mockFilter);
    expect(insertedDoc.length).toBe(1);
    expect(insertedDoc[0]).toStrictEqual(mockDoc);
  });

  it("upsert info that record -- after insert", async () => {
      mockDoc.name ='upsertName'
      idFilter._id = new ObjectId(mockDockId)
      const setParam = getSetParam(mockDoc)
    
    const upsertResult = await upsertDoc(
      testCollection,
      idFilter,
      setParam
    );
    expect(upsertResult).toHaveProperty("upsertedId");
  });

    it("check if that record was updated -- afterUpsertdoc", async () => {
      const insertedDoc = await findAllDocs(testCollection, idFilter);
      expect(insertedDoc.length).toBeGreaterThan(0);
      expect(insertedDoc[0].name).toBe(mockDoc.name)
    });

    it('delete that record --after upsert and find',async()=>{
        const deleteResult =await deleteDoc(testCollection,mockDoc);
        expect(deleteResult).toHaveProperty('deletedCount');
        expect(deleteResult.deletedCount).toBeGreaterThan(0);
    })

    it('check if the record has been deleted',async()=>{
        mockFilter = {
            name: { $eq: mockDoc.name },
            address: { $eq: mockDoc.address },
          };
        const findResult = await findAllDocs(testCollection,mockFilter);
        expect(findResult.length).toBe(0);
    })


});
