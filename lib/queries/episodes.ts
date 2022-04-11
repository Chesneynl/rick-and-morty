import { gql } from '@apollo/client'

export const EPISODES_QUERY = gql`
  query {
    episodes {
      results {
        id
        episode
      }
    }
  }
`
