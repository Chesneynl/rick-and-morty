import Image from 'next/image'
import styled from 'styled-components'

import { Character } from '../lib/types'

const Container = styled.div`
  display: block;
  width: 100%;
`

const Character = styled.div`
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
type Props = {
  characters: Character[]
}

export function Characters({ characters }: Props) {
  return (
    <Container>
      {characters.map((character) => (
        <Character key={character.id}>
          <StyledImage
            alt={character.name}
            src={character.image}
            width="100"
            height="100"
            layout="fixed"
          />
          <Info>
            <p>{character.name}</p>
            <Status className={character.status}>{character.status}</Status>
            <p>{character.species}</p>
            <p>{character.type}</p>
            <p>{character.gender}</p>
            <p>{character.created}</p>
          </Info>
        </Character>
      ))}
    </Container>
  )
}
