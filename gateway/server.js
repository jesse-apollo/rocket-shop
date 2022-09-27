import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";

import  dotenv  from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

const gateway = new ApolloGateway({});

const server = new ApolloServer({
  gateway
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
}); 
