const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./config');

const app = express();

mongoose.connect(
  `mongodb://${keys.mongodbUser}:${
    keys.mongodbPass
  }@ds117061.mlab.com:17061/${keys.mongodbBD}`
);
mongoose.connection.once('open', () => {
  console.log('conected to db');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Corriendo en puerto 4000');
});
