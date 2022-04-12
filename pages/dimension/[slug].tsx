import uniq from 'lodash/uniq'
import Head from 'next/head'
import { Context } from '@apollo/client'

import { Header } from 'lib-ui'
import {
  apolloClient,
  LOCATION_ROUTES_QUERY,
  LOCATIONS_BY_DIMENSION_QUERY,
  MENU_QUERY,
} from 'lib-graph'
import type { Location, Character } from 'lib-types'

export async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: LOCATION_ROUTES_QUERY,
  })
  const dimensions = uniq(data.locations.results.map((location: Location) => location.dimension))

  const paths = dimensions.map((dimension) => {
    return {
      params: {
        slug: dimension,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: Context) {
  const { slug } = params

  const { data: MenuData } = await apolloClient.query({
    query: MENU_QUERY,
  })

  const { data } = await apolloClient.query({
    query: LOCATIONS_BY_DIMENSION_QUERY,
    variables: { dimensionName: decodeURIComponent(slug) },
  })

  const residents = data.locations.results.reduce(
    (acc: Character[], location: Location) => [...acc, ...location.residents],
    [],
  )

  const { episodes, locations } = MenuData

  return {
    props: {
      episodes: episodes.results,
      characters: uniq(residents),
      locations: locations.results,
    },
  }
}

function CharactersByDimension() {
  return (
    <>
      <Head>
        <title>Rick and Morty App - Dimension</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Rick and Morty API - Dimension</Header>
    </>
  )
}

export default CharactersByDimension
