import { gql, ApolloError, ApolloServer } from "apollo-server-micro";
import { fetchAll ,findOne } from "src/utils";
import jwt from 'jsonwebtoken';
const SECRETE_KEY = "encryption secrete here"; 
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
            const token = jwt.sign(
                {
                  username: res.username,

                },
                SECRETE_KEY,
                {expiresIn: "24h" }
              );
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
