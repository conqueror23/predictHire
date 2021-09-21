import {gql} from  'apollo-server-micro'

const typeDefs = gql `
 
type User{
        _id:ID!
        companyId:ID!
        username:String
        name:String
        password:String
        token:String
        role:String!
    }

    type Company{
        _id:ID!
        name:String!
        address:String!
    }

    type Vacant{
        _id:ID!
        companyId:ID!
        title:String!
        description:String
        expiredAt:String
    }

    type Query {
        hello:String!
        Users: [User]
        User(usename:String!):User
        Companys: [Company]
        Vacants: [Vacant]
        Vacant (companyId:String!): Vacant
    }

    input LoginInput{
        username:String
        password:String
    }

    input VacantInput{
        _id:ID
        companyId:ID
        title:String
        description:String
        expiredAt:String
        token:String
    }

    type queryOutput{
        status: Int!
        message:String
    }

    type Mutation{
        login(loginInput:LoginInput):User!
        createVacant(vacantInput:VacantInput):Vacant!
        updateVacant(vacantInput:VacantInput):Vacant!
        deleteVacant(vacantInput:VacantInput):queryOutput!
    }

`;

export {typeDefs}