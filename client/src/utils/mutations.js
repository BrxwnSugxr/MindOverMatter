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

export const UN_REGISTER_USER_FROM_EVENT = gql`
  mutation unRegisterFromEvent($userId: String!, $eventId: String!) {
    unRegisterFromEvent(userId: $userId, eventId: $eventId) {
      success
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
        email
        type
      }
      token
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      admin {
        _id
        username
        email
        type
      }
      token
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id
      title
      description
      number_of_people
      is_virtual
      event_date
      image
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: ID!, $input: EventInput!) {
    updateEvent(eventId: $eventId, input: $input) {
      _id
      title
      description
      number_of_people
      is_virtual
      event_date
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
      title
      description
      number_of_people
      is_virtual
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation singleUpload($file: Upload!, $eventId: String!) {
    singleUpload(file: $file, eventId: $eventId) {
      mimetype
      url
      filename
    }
  }
`;

export const DONATE_AMOUNT = gql`
  mutation donateAmount($amount: String!) {
    donateAmount(amount: $amount) {
      id
    }
  }
`;

export const SEND_EMAIL = gql`
  mutation sendEmail($username: String!, $email: String!, $message: String!) {
    sendEmail(username: $username, email: $email, message: $message) {
      success
    }
  }
`;
