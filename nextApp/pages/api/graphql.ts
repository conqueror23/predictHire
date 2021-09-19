import {gql , ApolloServer} from 'apollo-server-micro'
import {schema} from 'apollo/schema'
import UserSchema from './user/userQuery'
// send request to other backend not 
const server = new ApolloServer({ schema: UserSchema});
const handler = server.createHandler({path:"/api/graphql"});


export const config ={
    api:{
        bodyParser:false
    }
}

export default handler;