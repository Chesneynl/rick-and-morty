import Head from 'next/head'
import { gql } from '@apollo/client'

import { Header } from 'lib-ui'
import { apolloClient, CHARACTER_OBJECT, MENU_QUERY } from 'lib-graph'

const QUERY = gql`
  ${CHARACTER_OBJECT}

  query {
    characters {
      results {
        ...characterObject
      }
    }
  }
`

export async function getStaticProps() {
  const { data: MenuData } = await apolloClient.query({
    query: MENU_QUERY,
  })
  const { data } = await apolloClient.query({
    query: QUERY,
  })

  if (!data || !MenuData) {
    return {
      redirect: {
        notFound: true,
      },
    }
  }

  const { episodes, locations } = MenuData
  const { characters } = data

  return {
    props: {
      episodes: episodes.results,
      characters: characters.results,
      locations: locations.results,
    },
  }
}

function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty App - Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Rick and Morty API - Home</Header>
    </>
  )
}

export default Home
