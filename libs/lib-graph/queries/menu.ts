import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query {
    episodes {
      results {
        id
        episode
        name
      }
    }
    locations {
      results {
        id
        name
        dimension
      }
    }
  }
`
