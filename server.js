const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const GRAPHQL_PORT = process.env.PORT || 4000;

const graphQLServer = express();

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
