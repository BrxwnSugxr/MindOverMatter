const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID!
    username: String
    email: String!
    type: String!
  }

  type UserEvents {
    _id: ID!
    user: User!
    event: Event!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Query {
    getEvent(eventId: String!): Event
    getPublicEvents: [Event]
    getEvents: [Event]
    userRegisteredEvents(userId: String!): [UserEvents]
  }
  type Event {
    _id: ID!
    title: String!
    description: String!
    number_of_people: String!
    is_virtual: Boolean!
    image: String
    event_date: String!
  }
  input EventInput {
    title: String!
    description: String!
    number_of_people: String!
    is_virtual: Boolean!
    event_date: String!
  }
  type AuthUser {
    user: User!
    token: String!
  }
  type AuthAdmin {
    admin: User!
    token: String!
  }

  type UserEvent {
    success: Boolean!
  }

  type DonateResponse {
    id: String!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    registerAdmin(username: String!, email: String!, password: String!): User!
    registerUserForEvent(userId: String!, eventId: String!): UserEvent!
    unRegisterFromEvent(userId: String!, eventId: String!): UserEvent!
    login(email: String!, password: String!): AuthUser!
    loginAdmin(email: String!, password: String!): AuthAdmin!
    createEvent(eventInput: EventInput!): Event
    updateEvent(eventId: ID!, input: EventInput!): Event
    deleteEvent(eventId: ID!): Event
    singleUpload(file: Upload!, eventId: String!): File!
    donateAmount(amount: String!): DonateResponse!
  }
`;

module.exports = typeDefs;
