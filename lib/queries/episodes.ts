import { gql } from '@apollo/client'
import { CHARACTER_OBJECT } from './fragments'

export const EPISODES_IDS_QUERY = gql`
  query {
    episodes {
      results {
        id
      }
    }
  }
`

export const EPISODE_BY_ID_QUERY = gql`
  ${CHARACTER_OBJECT}

  query getEpisodeById($id: ID!) {
    episode(id: $id) {
      id
      name
      characters {
        ...characterObject
      }
    }
  }
`
