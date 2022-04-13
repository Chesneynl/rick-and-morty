import Head from 'next/head'

import { Header } from 'lib-ui'
import { apolloClient, MENU_QUERY, LOCATION_ROUTES_QUERY, LOCATION_BY_ID_QUERY } from 'lib-graph'
import type { Location, Context } from 'lib-types'

export async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: LOCATION_ROUTES_QUERY,
  })
  const locationIds = data.locations.results.map((location: Location) => location.id)
  const paths = locationIds.map((locationId: string) => {
    return {
      params: {
        id: locationId,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: Context) {
  const { id: locationId } = params

  const { data: MenuData } = await apolloClient.query({
    query: MENU_QUERY,
  })

  const { data } = await apolloClient.query({
    query: LOCATION_BY_ID_QUERY,
    variables: { id: locationId },
  })

  if (!data || !MenuData) {
    return {
      redirect: {
        destination: '/500',
      },
    }
  }

  const { episodes, locations } = MenuData
  const { residents } = data.location

  return {
    props: {
      episodes: episodes.results,
      characters: residents,
      locations: locations.results,
    },
  }
}

function CharactersByLocation() {
  return (
    <>
      <Head>
        <title>Rick and Morty App - Location</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Rick and Morty API - Location</Header>
    </>
  )
}

export default CharactersByLocation
