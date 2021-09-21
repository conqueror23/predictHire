import {gql,ApolloError , ApolloServer} from 'apollo-server-micro'
import {fetchAll,createOne, ifAdminToken, findOne,upsertDoc, deleteDoc} from 'src/utils'

const DataSource ="VACANT"

export const vacantResolvers={
    Query:{
        Vacants:async()=>{
            try{
                return await fetchAll(DataSource);
            }catch(e){
                throw new ApolloError(JSON.stringify(e));
            }
        }
    },
    Mutation:{
        async createVacant(parent,{vacantInput},context,info){
            
            const {token,...vacantData} = vacantInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                    // before insert , check if exist avoid duplicate
                    // Main tag is companyId and job title, which could be improved by adding more params or using _id to increate differentiate ability
                    const queryPattern = `/companyId=${vacantData.companyId}&title=${vacantData.title}`
                    const ifExist =  await findOne(DataSource,queryPattern);
                    // duplicate controls
                    if(ifExist &&ifExist._id){
                        throw new ApolloError("Vacant already exist")
                    }else{
                        const insertRes = await createOne(DataSource,vacantData);
                        const insertedData = await findOne(DataSource,`/_id=${insertRes.insertedId}`)
                        console.log('in sertedData',insertedData);
                        return {
                            ...insertedData
                        }
                    }
            }else{
                throw new ApolloError("Admin previlege required")
            }
            
        },
        async updateVacant(parent,{vacantInput},context,info){
            const {token,...vacantData} = vacantInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                //updata document probably use the _id would be most solid as it is unique 
                //we can assume that the user can get the _id as user got the vacant list before operate
                const updateRes = await upsertDoc(DataSource,vacantData);
                if(updateRes && updateRes.upsertedId){
                    const insertedDoc = await findOne(DataSource,`/_id=${vacantData._id}`);
                    return insertedDoc
                }else{
                    return vacantInput
                }
            }else{
                throw new ApolloError("Admin previlege required")
            }
        },
        async deleteVacant(parent,{vacantInput},context,info){
            const {token,...vacantData} = vacantInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                // delete vacant based on _id is more reliable 
                // if the _id of that record does not exist error would be responsed from api 
                const deleteRes = await deleteDoc(DataSource,vacantData);
                console.log('dlete res',deleteRes.message.deletedCount)
                if(!deleteRes.message.deletedCount){
                    return {
                        status:deleteRes.status,
                        message:"No record found and no one get deleted"
                    }
                }else{
                    return {
                        status:deleteRes.status,
                        message:"Record has been deleted"
                    }
                }
                return deleteRes
                

            }else{
                throw new ApolloError("Admin previlege required")
            }    
        }
    }
}