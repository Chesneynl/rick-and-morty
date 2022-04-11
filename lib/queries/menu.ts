import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query {
    episodes {
      results {
        id
        episode
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
