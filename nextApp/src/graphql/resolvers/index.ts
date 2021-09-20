import {userResolvers} from './user'
import {vacantResolvers} from './vacant'
import {companyResolvers} from './company'


export const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...companyResolvers.Query,
        ...vacantResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...vacantResolvers.Mutation
    }
}