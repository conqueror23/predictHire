import { gql, ApolloError, ApolloServer } from "apollo-server-micro";
import { fetchAll ,findOne } from "src/utils";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import e from "express";
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
            const token = jwt.sign(
                {
                  username: res.username,

                },
                SECRETE_KEY,
                {expiresIn: "24h" }
              );
              console.log('you got a token',token);
              return {
                ...res,
                token,
              };
            }else{
                return {
                    token:"user does not exist"
                }
            }
        },
  },
};
