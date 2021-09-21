import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    _id: ID!
    companyId: ID!
    username: String
    name: String
    password: String
    token: String
    role: String!
  }

  type Company {
    _id: ID!
    name: String!
    address: String!
  }

  type Vacant {
    _id: ID!
    companyId: ID!
    title: String!
    description: String
    expiredAt: String
  }

  type Query {
    Users: [User]
    Companys: [Company]
    Vacants: [Vacant]
  }

  input LoginInput {
    username: String
    password: String
  }

  input VacantInput {
    _id: ID
    companyId: ID
    title: String
    description: String
    expiredAt: String
    token: String
  }

  type QueryOutput {
    status: Int!
    message: String
  }

  type Mutation {
    login(loginInput: LoginInput): QueryOutput!
    createVacant(vacantInput: VacantInput): QueryOutput!
    updateVacant(vacantInput: VacantInput): QueryOutput!
    deleteVacant(vacantInput: VacantInput): QueryOutput!
  }
`;

export { typeDefs };
