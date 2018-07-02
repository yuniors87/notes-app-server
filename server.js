const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const graphQLServer = express();
graphQLServer.use(cors);

const GRAPHQL_PORT = process.env.PORT || 4000;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(
    'connection',
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Conectado a la bd');
      }
    }
  );
}

graphQLServer.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  )
);
