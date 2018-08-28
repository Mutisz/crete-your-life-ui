import ApolloClient from "apollo-boost";

import { defaults, typeDefs, resolvers } from "../schema";

const createClient = () =>
  new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    clientState: { defaults, typeDefs, resolvers }
  });

export default createClient;
