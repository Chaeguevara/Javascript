// index.js
// This is the main entry point of our application

// require express dependency
const express = require('express');
//Implement apollo-server for GraphQL
const { ApolloServer, gql } = require('apollo-server-express');
//import env environment
require('dotenv').config();

const db = require('./db');
const models = require('./models');

//port number
const port = process.env.PORT || 4000;
//Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;


//schema
const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note]
    note(id:ID): Note
  }
  type Mutation{
    newNote(content: String!): Note
  }
`;


// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args, id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note, create({
        content: args.content,
        author: 'Heejin Chae'
      });
    }
  }
};

// add app object
const app = express();

db.connect(DB_HOST);

// Apolo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

//set port number
app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);