import Head from 'next/head'

import { Header } from 'lib-ui'
import { apolloClient, EPISODES_IDS_QUERY, MENU_QUERY, EPISODE_BY_ID_QUERY } from 'lib-graph'
import type { Episode, Context } from 'lib-types'

export async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: EPISODES_IDS_QUERY,
  })
  const episodesIds = data.episodes.results.map((episode: Episode) => episode.id)
  const paths = episodesIds.map((epsiodeId: string) => {
    return {
      params: {
        id: epsiodeId,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: Context) {
  const { id: episodeId } = params

  const { data: MenuData } = await apolloClient.query({
    query: MENU_QUERY,
  })

  const { data } = await apolloClient.query({
    query: EPISODE_BY_ID_QUERY,
    variables: { id: episodeId },
  })

  const { episodes, locations } = MenuData
  const { characters } = data.episode

  return {
    props: {
      episodes: episodes.results,
      characters: characters,
      locations: locations.results,
    },
  }
}

function CharactersByEpisode() {
  return (
    <>
      <Head>
        <title>Rick and Morty App - Episode</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Rick and Morty API - Episode</Header>
    </>
  )
}

export default CharactersByEpisode
