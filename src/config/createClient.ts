import { ApolloClient } from "apollo-client";
import { ApolloCache } from "apollo-cache";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError, ErrorResponse } from "apollo-link-error";
import { withClientState } from "apollo-link-state";

import { defaults, typeDefs, resolvers } from "../schema";

const errorHandler = ({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
};

const createClientStateConfig = (
  cache: ApolloCache<NormalizedCacheObject>
) => ({
  defaults,
  typeDefs,
  resolvers,
  cache
});

const createLinkHttp = () =>
  new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    credentials: "same-origin"
  });

const createLink = (cache: ApolloCache<NormalizedCacheObject>) =>
  ApolloLink.from([
    onError(errorHandler),
    withClientState(createClientStateConfig(cache)),
    createLinkHttp()
  ]);

const createCache = () => new InMemoryCache();

const createConfig = () => {
  const cache = createCache();
  return {
    link: createLink(cache),
    cache
  };
};

const createClient = () => new ApolloClient(createConfig());

export default createClient;
