//installation
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password){
        _id
        username
        email
    }
}
`