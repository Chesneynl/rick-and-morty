import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

import type { Character } from '../../lib-types/types'

const Container = styled.div`
  display: block;
  width: 100%;
`

const CharacterContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.black};
  border-radius: ${(p) => p.theme.borderRadius};
  padding: ${(p) => p.theme.gutters.medium};
  margin-bottom: ${(p) => p.theme.gutters.medium};
`

const StyledImage = styled(Image)`
  border-radius: 50%;
`

const Info = styled.div`
  display: block;
  margin-left: ${(p) => p.theme.gutters.medium};
`

const Name = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: ${(p) => p.theme.gutters.extraSmall};
  font-size: ${(p) => p.theme.fontSizes.large};
`

const Status = styled.span`
  font-weight: bold;

  &.unknown {
    color: black;
  }

  &.Alive {
    color: green;
  }

  &.Dead {
    color: red;
  }
`

const Episodes = styled.p`
  font-weight: bold;
  margin-top: ${(p) => p.theme.gutters.extraSmall};
  cursor: pointer;
`

type CharactersProps = {
  characters: Character[]
}

type CharacterLitItemProps = {
  character: Character
}

function CharacterListItem({ character }: CharacterLitItemProps) {
  const [episodesOpen, setEpisodesOpen] = useState<boolean>(false)

  return (
    <CharacterContainer key={character.id}>
      <StyledImage
        alt={character.name}
        src={character.image}
        width="100"
        height="100"
        layout="fixed"
      />
      <Info>
        <Name>{character.name}</Name>
        <Status className={character.status}>{character.status}</Status>
        <p>{character.species}</p>
        <p>{character.type}</p>
        <p>{character.gender}</p>
        <p>Created at: {character.created}</p>
        <p>Location: {character.location.name}</p>
        <p>Dimension: {character.location.dimension}</p>
        <Episodes onClick={() => setEpisodesOpen(!episodesOpen)}>Episodes: </Episodes>
        {episodesOpen && character.episode.map((episode) => <p key={episode.id}>{episode.name}</p>)}
      </Info>
    </CharacterContainer>
  )
}

export function Characters({ characters }: CharactersProps) {
  if (!characters.length) return <Container>No characters found....</Container>

  return (
    <Container>
      {characters.map((character) => (
        <CharacterListItem key={character.id} character={character} />
      ))}
    </Container>
  )
}
