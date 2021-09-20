import { ApolloServer} from 'apollo-server-micro'

import {schema} from 'lib/schema'
import UserSchema from './user/userSchema'
// send request to other backend not 
import {typeDefs,resolvers} from 'src/graphql'

const server = new ApolloServer({ 
    typeDefs,resolvers
});
const handler = server.createHandler({path:"/api/graphql"});


export const config ={
    api:{
        bodyParser:false
    }
}

export default handler;