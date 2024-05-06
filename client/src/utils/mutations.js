import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const REGISTER_ADMIN = gql`
  mutation registerAdmin(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerAdmin(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const REGISTER_USER_FOR_EVENT = gql`
  mutation registerUserForEvent($userId: String!, $eventId: String!) {
    registerUserForEvent(userId: $userId, eventId: $eventId) {
      success
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: !String) {
    login(email: $email, password: $password) {
        user{
            _id
            username
            email
            type
        }
        token
    }
}
`