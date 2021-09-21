import {gql,ApolloError , ApolloServer} from 'apollo-server-micro'
import {fetchAll,createOne, ifAdminToken, findOne,upsertDoc, deleteDoc} from 'src/utils'

const DataSource ="VACANT"

/**
 *  Vacant Resolvers 
 *  Includes :
 *      Querys :
 *         Vacants: show all vacants
 *      Mutations:
 *          createVacant
 *          updateVacant
 *          deleteVacant
 */

export const vacantResolvers={
    Query:{
        Vacants:async()=>{
            // all users (user & admin) are avilable to see all the vacancies
            // if there are login requirements an authentication may need to be added 
            try{
                return await fetchAll(DataSource);
            }catch(e){
                throw new ApolloError(JSON.stringify(e));
            }
        }
    },
    Mutation:{
        // create vacant 
        async createVacant(parent,{vacantInput},context,info){
            //_id was taken out as it is an object id that mongodb ususally use 
            const {token,_id,...vacantData} = vacantInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                    // before insert , check if exist avoid duplicate
                    // changed to adapt all the input from the user to avoid the most duplicate
                    const entry = Object.entries(vacantData).map(ele=>ele.join('=')).join('&');
                    const findRes =  await findOne(DataSource,`/${entry}`);
                    if(findRes && findRes.message.length>0){
                    //record alread exist no create action
                        return {
                                    status:500,
                                    message:"Vacant aleardy exist"
                                }
                    }else{
                    // vacant not exist safe to crearte new one
                         const insertRes = await createOne(DataSource,vacantData);
                        return {
                            status:200,
                            message:`Vacannt created _id: ${insertRes.message.insertedId}`
                        } 
                    }
            }else{
                throw new ApolloError("Admin previlege required")
            }
        },
        // update vacant
        async updateVacant(parent,{vacantInput},context,info){
            const {token,...vacantData} = vacantInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                //updata document probably use the _id would be most solid as it is unique 
                //we can assume that the user can get the _id as user got the vacant list before operate
                const updateRes = await upsertDoc(DataSource,vacantData);
                console.log('updateRes',updateRes)
                const changedId =updateRes.message.upsertedId;
                if(!changedId){
                    return {
                        status: updateRes.status,
                        message:`record has been udpated`
                    }
                }else{
                    return {
                        status:updateRes.status,
                        message: `No record has been found, new record added with _id ${changedId}`
                    }
                }
            }else{
                throw new ApolloError("Admin previlege required")
            }
        },
        // delete vacant
        async deleteVacant(parent,{vacantInput},context,info){
            const {token,...vacantData} = vacantInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                // delete vacant based on _id is more reliable 
                // if the _id of that record does not exist error would be responsed from api 
                const deleteRes = await deleteDoc(DataSource,vacantData);
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
                
            }else{
                throw new ApolloError("Admin previlege required")
            }    
        }
    }
}