import { ApolloClient, HttpLink, InMemoryCache,NormalizedCacheObject } from "@apollo/client";
import getConfig from "next/config";
import UserSchema from './queries/user/userQuery'

const { publicRuntimeConfig } = getConfig();

const createIsomorphicLink=()=>{
  if(typeof window == undefined){
    //server
    const {SchemaLink} = require( '@apollo/client/link/schema')
    const {schema} = require( 'apollo/schema')
    return new SchemaLink({schema})
  }else{
    //client 
    return new HttpLink({uri:"/api/graphql"})
  }
}

// new HttpLink({
//       uri: publicRuntimeConfig.API_URL,
//       headers: {
//         "x-hasura-admin-secret": publicRuntimeConfig.API_KEY,
//         lang: "en",
//       },
//     }),

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphicLink(), 
    cache: new InMemoryCache(),
  });
  
};

export default createApolloClient;
