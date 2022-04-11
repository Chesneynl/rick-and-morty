import { gql } from '@apollo/client'

export const CHARACTER_OBJECT = gql`
  fragment characterObject on Character {
    id
    name
    status
    species
    type
    gender
    image
    created
    origin {
      id
      name
      type
      dimension
      created
    }
    location {
      id
      name
      type
      dimension
      created
    }
    episode {
      id
      name
      air_date
      created
    }
  }
`
