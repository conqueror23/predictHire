import { ApolloError } from "apollo-server-micro";
import { fetchAll } from "src/utils";
// followed by the project structure designed all user service are using same datasource
const DataSource = "COMPANY";

/**
 *  Compamy resolvers
 *   company related graphql ops can be added here
 *  inlcude
 *         Query:
 *             Companys: show all the company data
 */

export const companyResolvers = {
  Query: {
    Companys: async () => {
      try {
        return await fetchAll(DataSource);
      } catch (e) {
        throw new ApolloError(JSON.stringify(e));
      }
    },
  },
};
