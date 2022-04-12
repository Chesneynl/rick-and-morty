import styled from 'styled-components'
import { phoneUp } from '../breakpoints'

import { Character, Episode, Location } from '../../lib-types/types'
import { Characters } from './Characters'
import { Menu } from './Menu'

const PageWidth = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 4px;
  color: ${(p) => p.theme.colors.primary};
`

const Content = styled.div`
  ${phoneUp} {
    display: flex;
  }
`

type Props = {
  characters: Character[]
  episodes: Episode[]
  locations: Location[]
  children?: React.ReactNode
}

export function Layout({ episodes, locations, characters, children }: Props) {
  return (
    <>
      <PageWidth>
        {children}
        <Content>
          <Menu episodes={episodes} locations={locations} />
          <Characters characters={characters} />
        </Content>
      </PageWidth>
    </>
  )
}
