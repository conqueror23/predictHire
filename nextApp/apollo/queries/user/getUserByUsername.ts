
import gql from 'graphql-tag'
export const FIND_USER_BY_USERNAME= gql`
query GetUsers$($username:String!){
    user (where:{usename:{$eq:$username}}){
        usename
        password
    }    
}
`
