require('./db');
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const { graphqlUploadExpress } = require('graphql-upload');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./middleware/authMiddleware');
require('./config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const app = express();
const PORT = process.env.PORT || 3030;

(async () => {
  try {
    app.use(graphqlUploadExpress());
    await server.start();
    server.applyMiddleware({ app });
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
      console.log(
        `GraphQL Server started on http://localhost:${PORT}${server.graphqlPath}`
      );
    });

    app.get('*', (req, res, next) => {
      return res.sendFile(
        path.join(__dirname, '..', 'client', 'dist', 'index.html')
      );
    });

    app.use((error, req, res, next) => {
      if (error) {
        console.log('Err', error);
        return res
          .status(500)
          .send(error.message || 'Something went wrong. Try again later.');
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
