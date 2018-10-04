const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require("graphql-tools");

const path = require('path');

const typeDefs = require("./schema").Schema;
const resolvers = require("./resolvers").Resolvers;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

var app = express();

server.applyMiddleware({app, path: '/graphql'})

app.use('/', express.static(path.join(__dirname, 'dist/contacts')));

console.log(path.join(__dirname, 'dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/contacts/index.html'));
});

app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");
