import { useRouter } from 'next/router'
import styled from 'styled-components'
import uniq from 'lodash/uniq'

import type { Character, Episode, Location } from '../lib/types'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const MenuContainer = styled.div`
  width: 400px;
  margin-right: ${(p) => p.theme.gutters.base};
  position: sticky;
  top: 0;
  align-self: start;
`

const Category = styled.span`
  display: block;
  padding: ${(p) => p.theme.gutters.small};
  border-radius: ${(p) => p.theme.borderRadius};
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;
  cursor: pointer;
`

const StyledLink = styled.a`
  display: block;
  cursor: pointer;
  padding: ${(p) => p.theme.gutters.extraSmall} ${(p) => p.theme.gutters.small};
  border-radius: ${(p) => p.theme.borderRadius};
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;

  &:hover,
  &.active {
    background: #00d69e;
    color: white;
  }
`

const SubMenuItems = styled.div`
  display: block;
  padding: 0 ${(p) => p.theme.gutters.extraSmall};
  font-size: 12px;
`

type Props = {
  href: string
  children: React.ReactNode
}

type MenuProps = {
  characters: Character[]
  episodes: Episode[]
  locations: Location[]
}

export function Menu({ episodes, locations }: MenuProps) {
  const [openCategory, setOpenCategory] = useState<string | undefined>()
  const dimensions = uniq(locations.map((location) => location.dimension))
  const router = useRouter()

  function toggleMenuItem(category: string) {
    if (category === openCategory) return setOpenCategory(undefined)

    setOpenCategory(category)
  }

  return (
    <MenuContainer>
      <Category onClick={() => toggleMenuItem('dimensions')}>- Dimension</Category>
      {openCategory === 'dimensions' && (
        <SubMenuItems>
          {dimensions.map((dimension) => (
            <Link key={dimension} href={`/dimension/${encodeURIComponent(dimension)}`} passHref>
              <StyledLink className={router.pathname == '/' ? 'active' : ''}>
                {dimension}
              </StyledLink>
            </Link>
          ))}
        </SubMenuItems>
      )}

      <Category onClick={() => toggleMenuItem('locations')}>- Locations</Category>
      {openCategory === 'locations' && (
        <SubMenuItems>
          {locations.map((location) => (
            <Link key={location.id} href={`/location/${location.id}`} passHref>
              <StyledLink className={router.pathname == '/' ? 'active' : ''}>
                {location.name}
              </StyledLink>
            </Link>
          ))}
        </SubMenuItems>
      )}

      <Category onClick={() => toggleMenuItem('episodes')}>- Episodes</Category>
      {openCategory === 'episodes' && (
        <SubMenuItems>
          {episodes.map((episode) => (
            <Link key={episode.id} href={`/episode/${episode.id}`} passHref>
              <StyledLink className={router.pathname == '/' ? 'active' : ''}>
                {episode.episode} {episode.name}
              </StyledLink>
            </Link>
          ))}
        </SubMenuItems>
      )}
    </MenuContainer>
  )
}
