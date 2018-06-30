var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

const GRAPHQL_PORT = process.env.PORT || 3000;

var schema = buildSchema(`
  type Query {
    message: String
  }
`);

var root = {
  message: () => 'Hola mundo'
};

var app = express();

app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
