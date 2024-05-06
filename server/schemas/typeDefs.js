const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    type: String!
  }

  typeUserEvents {
    _id: ID!
    user: User!
    event: Event!
  }

  type Query {
    getUser: User
    getEvent(eventId: String!): Event
    getPublicEvents: [Event]
    getEvents: [Event]
    userRegisteredEvents(userId: String!): [UserEvents]

  }
  type Event {
    _id: ID!
    title: String!
    description: String!
    number_of_people: Int!
    is_virtual: Boolean!
  }
  input EventInput {
    title: String!
    description: String!
    number_of_people: String!
    is_virtual: Boolean!
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
  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    registerAdmin(username: String!, email: String!, password: String!): User!
    registerUserForEvent(userId: String!, eventId: String!): AuthUser!
    login(email: String!, password: String!): AuthUser!
    loginAdmin(email: String!, password: String!): AuthUser!
    createEvent(eventInput: EventInput!): Event
    updateEvent(eventId: ID!, input: EventInput!): Event
    deleteEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;