import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Menu, Characters } from '../components'
import { Header } from '../components/Header'
import styles from '../styles/Home.module.css'

const Content = styled.div`
  display: flex;
`

const EXCHANGE_RATES = gql`
  query {
    characters {
      info {
        count
      }
      results {
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
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error {error.message}</p>

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Rick and Morty API</Header>
      <Content>
        <Menu />
        <Characters characters={data.characters.results} />
      </Content>
    </>
  )
}

export default Home
