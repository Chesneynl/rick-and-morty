import { gql } from '@apollo/client'
import { CHARACTER_OBJECT } from './fragments'

export const LOCATION_ROUTES_QUERY = gql`
  query {
    locations {
      results {
        id
        name
        dimension
      }
    }
  }
`

export const LOCATIONS_BY_DIMENSION_QUERY = gql`
  ${CHARACTER_OBJECT}

  query getLocationByDimension($dimensionName: String!) {
    locations(filter: { dimension: $dimensionName }) {
      results {
        residents {
          ...characterObject
        }
      }
    }
  }
`

export const LOCATION_BY_ID_QUERY = gql`
  ${CHARACTER_OBJECT}

  query getLocationById($id: ID!) {
    location(id: $id) {
      id
      name
      dimension
      residents {
        ...characterObject
      }
    }
  }
`
