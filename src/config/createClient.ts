import { ApolloClient, ApolloClientOptions } from "apollo-client";
import { ApolloCache } from "apollo-cache";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError, ErrorResponse } from "apollo-link-error";

import { defaults, typeDefs, resolvers } from "../state";
import { GraphQLError } from "graphql";

const logGraphQlError = ({ message, path }: GraphQLError): void =>
  console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);

const logNetworkError = ({ message }: Error): void =>
  console.error(`[Network error]: ${message}`);

const errorHandler = ({ graphQLErrors, networkError }: ErrorResponse): void => {
  if (graphQLErrors) {
    graphQLErrors.map(logGraphQlError);
  }
  if (networkError) {
    logNetworkError(networkError);
  }
};

const createLinkHttp = (): HttpLink =>
  new HttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: "same-origin"
  });

const createLink = (): ApolloLink =>
  ApolloLink.from([onError(errorHandler), createLinkHttp()]);

const createCache = (): ApolloCache<NormalizedCacheObject> => {
  const cache = new InMemoryCache();
  cache.writeData({ data: defaults });

  return cache;
};

const createConfig = (): ApolloClientOptions<NormalizedCacheObject> => {
  return {
    link: createLink(),
    cache: createCache(),
    typeDefs,
    resolvers
  };
};

const createClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient(createConfig());

export default createClient;
