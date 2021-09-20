import {gql,ApolloError , ApolloServer} from 'apollo-server-micro'
import {fetchAll} from 'src/utils'
export const vacantResolvers={
    Query:{
        Vacants:async()=>{
            try{
                return await fetchAll("VACANT");
            }catch(e){
                throw new ApolloError(JSON.stringify(e));
            }
        }
    }
}