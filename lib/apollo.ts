import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
})

export default apolloClient