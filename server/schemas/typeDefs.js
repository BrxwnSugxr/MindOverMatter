const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String!
    }

    type Query {
        getUser: User
        getEvent: Event
        getEvents: Event
      
    }
    type Event {
        _id: ID!
        title: String!
        description: String!
        number_of_people: Int!
        is_virtual: Boolean!
    }
    type AuthUser {
        user: User!
        token: String!
    }
    type Mutation {
        register(username: String!, email: String!, password: String!):
    User!
        login(email: String!, password: String!): AuthUser!
        createEvent(eventInput: EventInput!): Event
        updateEvent(eventId: ID!, input: EventInput!): Event
        deleteEvent(eventId: ID!): Event
    }
`;


module.exports = typeDefs;