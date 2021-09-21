import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const createIsomorphicLink = () => {
  if (typeof window == undefined) {
    //server
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("apollo/schema");
    return new SchemaLink({ schema });
  } else {
    //client
    return new HttpLink({ uri: "/api/graphql" });
  }
};


const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
