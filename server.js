require('dotenv').config();
const uuid = require('uuid');
const express = require("express");
const Sequelize = require('sequelize');
const { ApolloServer, gql } = require('apollo-server-express');
const models = require('./models');

// global vars
const _port = 4100;
const _app_folder = 'dist/coldsweatgames';

// Setup and Configure Apollo Server with GraphQL Schemas and Resolvers
const typeDefs = gql`
  
  type Exerpt {
    id:String 
    content:String 
    ip:String
    votes:[Vote]
    date_added:String
  }
  
  type Vote {
    id:String
    exerpt_id:String
    exerpt:Exerpt
    ip:String
    is_funny:Boolean
    date_added:String
  }
  
  type Query {
    exerpt(id:String!): Exerpt
    exerpts(limit:Int! = 10, offset:Int!=0): [Exerpt]
  }
  
  type Mutation {
    create_exerpt(content:String!, ip:String!): Exerpt
    cast_vote(exerpt_id:String!, is_funny:Boolean!, ip:String!): Vote
  }

  schema {
    query: Query,
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    exerpts: (parent, {limit, offset,}) => {
      const data = models.Exerpt.findAll();
      return data;
    },
    exerpt: (parent, {id,}) => {
      const data = models.Exerpt.findOne({
        id: id
      });

      return data;
    },
  },
  Mutation: {
    create_exerpt: async (parent, {content, ip}) => {
      const data = await models.Exerpt.create({
        id: uuid.v4(),
        content: content,
        ip: ip
      });

      return data;
    },

    cast_vote: async (parent, {exerpt_id, is_funny, ip}) => {
      const data = await models.Vote.create({
        id: uuid.v4(),
        exerpt_id: exerpt_id,
        is_funny: is_funny,
        ip: ip
      });

      return data;
    }
  }
};

const server = new ApolloServer({typeDefs, resolvers});

// Bootstrap a basic ExpressJS app
const app = express();

// catch every static file (uses a dot) and pulls from the app_folder
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// allow apollo to inform express about the /graphql endpoint
server.applyMiddleware({app});

// catch every other request and send it to the angular app
app.all('*', function(req, res) {
   res.status(200).sendFile('/index.html', {root: _app_folder});
});



// and finally spin up the app listener
app.listen({port: _port}, () => {
  console.log(`Server ready at http://localhost:${_port}${server.graphqlPath}`);
});
