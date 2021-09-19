import { enumType } from "@nexus/schema";
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const BASE_URL_USER = "http://localhost:3002";

function fetchResponseByURL(relativeURL: string) {
  return fetch(`${BASE_URL_USER}${relativeURL}`).then((res) => res.json());
}

function fetchUsers() {
  return fetchResponseByURL("/findAll").then((json) => json.message);
}

function fetchUserByURL(relativeURL: string) {
  fetchResponseByURL(relativeURL).then((json) => {
    console.log('request send',json)
    return json.message
  })

  return fetchResponseByURL(relativeURL).then((json) => json.message);
}

const UserType = new GraphQLObjectType({
  name: "User",
  description: "user to check out",
  fields: () => ({
    _id: { type: GraphQLString, resolve: (user) => user._id },
    companyId: { type: GraphQLString, resolve: (user) => user.companyId },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    password: { type: GraphQLString, resolve: (user) => user.password },
    // role is actually enum but set as string here to see them
    role: { type: GraphQLString, resolve: (user) => user.role },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: " root of all user",
  fields: () => ({
    allUsers: {
      type: new GraphQLList(UserType),
      resolve: fetchUsers,
    },
    user:{
        type: new GraphQLList(UserType),
        args:{
            _id:{type:GraphQLString},
            username:{type:GraphQLString},
        },
        resolve:(root,args)=>{
          const key = Object.keys(args)[0];
          const value = Object.values(args)[0];          
          return fetchUserByURL(`/find/${key}=${value}`)
        }
        
    }
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
