import {gql,ApolloError , ApolloServer} from 'apollo-server-micro'
import {fetchAll,createOne, ifAdminToken} from 'src/utils'
export const vacantResolvers={
    Query:{
        Vacants:async()=>{
            try{
                return await fetchAll("VACANT");
            }catch(e){
                throw new ApolloError(JSON.stringify(e));
            }
        }
    },
    Mutation:{
        async createVacant(parent,{vacanInput},context,info){
            const {token,...vacantData} = vacanInput
            const isAdmin= await ifAdminToken(token);
            if(isAdmin){
                const res = await createOne("VACANT",vacantData);
            }else{
                throw new ApolloError("Admin previlege required")
            }
            
        }
    }
}