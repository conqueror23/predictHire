import { fetchAll,findDoc,createOne,upsertDoc,deleteDoc} from '../utils'
describe("utils- fetchelpers test", () => {
    const testDataSource = "VACANT";
    let mockVacant = {
      title: `sn dev-${Math.random()}`,
      description: "eereno oncalls ",
      companyId: '61486a985bdfdd2d47d0f014',
      expiredAt: "2012-23-23",
    };
    let insertId =0;
    let udpatedVacant={};
  
    // @ts-ignore
    const structureExpectaion =(response)=>{
      // request expcet to be succesfull
      expect(response).toHaveProperty('status',200);
      // response data structure should be gurenteed
      expect(response).toHaveProperty('message');
    }
    
    it("fetchALl test", async () => {
      const response = await fetchAll(testDataSource);
      expect(Array.isArray(response)).toBe(true);
    });
  
    it("find test",async ()=>{
      const params = Object.entries(mockVacant).map(ele=>ele.join('=')).join('&');
      const response = await findDoc(testDataSource,'/'+params);
  
      structureExpectaion(response);
      //  record shoul be not found a random number added, some sort unique
      expect(Array.isArray(response.message)).toBe(true);
      expect(response.message.length).toBe(0);
    })
  
    it("create a vacant",async ()=>{
      const response = await createOne(testDataSource,mockVacant);
      structureExpectaion(response);
      expect(response.message).toHaveProperty('insertedId')
      //pass that id to next test
      insertId =response.message.insertedId
    })
  
    it('update a vacant',async ()=>{
       udpatedVacant = {
        ...mockVacant,
        _id:insertId
      }
      const response = await upsertDoc(testDataSource,udpatedVacant);
      structureExpectaion(response);
      expect(response.message).toHaveProperty('upsertedId',null)
      
    })
  
    it("delete a vacant",async() =>{
      const response = await deleteDoc(testDataSource,udpatedVacant);
      structureExpectaion(response); 
      expect(response.message).toHaveProperty('deletedCount',1);
    })
  
    it("test delte is complete",async()=>{
      // @ts-ignore
      const {_id} = udpatedVacant;
      const response = await findDoc(testDataSource,`/_id=${_id}`);
      structureExpectaion(response);
      expect(Array.isArray(response.message)).toBe(true);
      expect(response.message.length).toBe(0);
    })
  });