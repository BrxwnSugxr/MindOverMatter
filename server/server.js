require('./db');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typedefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./middleware/authMiddleware');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const app = express();
const PORT = process.env.PORT || 3030;

(async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
      console.log(
        `GraphQL Server started on http://localhost:${server.graphqlPath}`
      );
    });

    app.use((error, req, res) => {
      if (error) {
        console.log('Err', error);
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
