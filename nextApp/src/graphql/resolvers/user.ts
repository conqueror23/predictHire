import { ApolloError } from "apollo-server-micro";
import { fetchAll, findDoc, genToken } from "src/utils";

// followed by the project structure designed all user service are using same datasource
const DataSource = "USER";
/**
 *  User resolvers
 *    Query :
 *      Users: get all users data
 *    Mutation:
 *      login : login and get tokens
 */
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
    // user login
    async login(parent, { loginInput: { username, password } }, context, info) {
      const res = await findDoc(
        DataSource,
        `/username=${username}&password=${password}`
      );
      //findDoc get all the matching record
      // in this case index 0 should be the only result if user username and password match
      const uesrRecord = res.message[0];
      if (res && uesrRecord) {
        // generate a token for valid existing users only

        const token = genToken({
          username: uesrRecord.username,
          role: uesrRecord.role,
        });
        return {
          status: res.status,
          message: token,
        };
      } else {
        return {
          status: res.status,
          message: "username password is unmatched",
        };
        // throw new ApolloError("User dose not exst","404");
      }
    },
  },
};
