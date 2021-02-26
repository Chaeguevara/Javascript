// index.js
// This is the main entry point of our application
// require express dependency
const express = require('express');
// add app object
const app = express();
//port number
const port = process.env.PORT || 4000;
//Implement apollo-server for GraphQL
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]
  }
`;

// array that will be resolved or mutated
let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// crate note type

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes
  }
};

// Apolo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

//get methodd of app object. When user access the URL, get "Hello World"
app.get('/', (req, res) => res.send('Hello Web Server!!!'));

//set port number
app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
