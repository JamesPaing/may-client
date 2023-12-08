//@ts-ignore
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { onError } from '@apollo/client/link/error';

const host = '192.168.100.113:4000';
const url = `http://${host}/graphql`;
const wsUrl = `ws://${host}/graphql`;

const httpLink = createUploadLink({
    uri: url,
    headers: {
        'Apollo-Require-Preflight': 'true',
    },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const wsLink =
    typeof window !== 'undefined'
        ? new GraphQLWsLink(
              createClient({
                  url: wsUrl,
              })
          )
        : null;

const link =
    typeof window !== 'undefined' && wsLink != null
        ? split(
              //@ts-ignore
              ({ query }) => {
                  const def = getMainDefinition(query);
                  return (
                      def.kind === 'OperationDefinition' &&
                      def.operation === 'subscription'
                  );
              },
              wsLink,
              httpLink
          )
        : httpLink;

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
