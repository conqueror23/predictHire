import {gql,ApolloError , ApolloServer} from 'apollo-server-micro'
import {fetchAllUser,fetchAll} from 'src/utils'
export const companyResolvers={
    Query:{
        Companys:async()=>{
            try{
                return await fetchAll("COMPANY");
            }catch(e){
                throw new ApolloError(JSON.stringify(e));
            }
        },
    }
}