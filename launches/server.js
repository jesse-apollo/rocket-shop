const fs = require('fs');
const dotenv = require('dotenv');

const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { MongoClient } = require("mongodb");

const resolvers = require('./resolvers');

// Import datasources
const LaunchAPI = require('./datasources/launches');

dotenv.config();

// Load schema
const schema = gql(fs.readFileSync('schema.graphql', 'utf8'))

// Connect to MongoDB
const client = new MongoClient(process.env.DB_CONN);
client.connect();

const database = client.db("rockets-data");

const dataSources = () => ({
  launchAPI: new LaunchAPI(database),
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  schema: buildSubgraphSchema([{ typeDefs: schema, resolvers }]),
  dataSources: dataSources
});

const PORT = process.env.PORT || 4000;

// The `listen` method launches a web server.
server.listen({port:PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
