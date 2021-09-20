import { gql, ApolloError, ApolloServer } from "apollo-server-micro";
import { fetchAll ,findOne,genToken } from "src/utils";
import jwt from 'jsonwebtoken';
export const userResolvers = {
  Query: {
    Users: async () => {
      try {
        return await fetchAll("USER");
      } catch (e) {
        throw new ApolloError(JSON.stringify(e));
      }
    },
    },
    Mutation: {
        async login(
          parent,
          { loginInput: { username, password } },
          context,
          info
        ) {
          const res = await findOne("USER",`/username=${username}&password=${password}`) 
          if(res){
            // generate a token for valid existing users only
            const token =genToken({username: res.username,role:res.role})
              return {
                ...res,
                token,
              };
            }else{
                throw new ApolloError("User dose not exst","404");
            }
        },
  },
};
