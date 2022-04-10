import { useRouter } from 'next/router'
import styled from 'styled-components'
import uniq from 'lodash/uniq'

import type { Character, Episode, Location } from '../lib/types'
import { useEffect, useState } from 'react'

const MenuContainer = styled.div`
  width: 300px;
  margin-right: ${(p) => p.theme.gutters.base};
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

const SubItem = styled.div`
  display: block;
  cursor: pointer;
  padding: ${(p) => p.theme.gutters.small};
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
  padding: 0 ${(p) => p.theme.gutters.small};
`

type Props = {
  href: string
  children: React.ReactNode
}

type MenuProps = {
  characters: Character[]
  episodes: Episode[]
  locations: Location[]
  onClick: (category: string, filterVariable: string) => void
}

export function Menu({ onClick, episodes, locations }: MenuProps) {
  const [openCategory, setOpenCategory] = useState<string | undefined>()
  const dimensions = uniq(locations.map((location) => location.dimension))
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [router])

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
            <SubItem
              key={dimension}
              className={router.pathname == '/' ? 'active' : ''}
              onClick={() => onClick('dimensions', dimension)}
            >
              {dimension}
            </SubItem>
          ))}
        </SubMenuItems>
      )}

      <Category onClick={() => toggleMenuItem('locations')}>- Locations</Category>
      {openCategory === 'locations' && (
        <SubMenuItems>
          {locations.map((location) => (
            <SubItem
              key={location.id}
              className={router.pathname == '/' ? 'active' : ''}
              onClick={() => onClick('locations', location.id)}
            >
              {location.name}
            </SubItem>
          ))}
        </SubMenuItems>
      )}

      <Category onClick={() => toggleMenuItem('episodes')}>- Episodes</Category>
      {openCategory === 'episodes' && (
        <SubMenuItems>
          {episodes.map((episode) => (
            <SubItem
              key={episode.id}
              className={router.pathname == '/' ? 'active' : ''}
              onClick={() => onClick('episodes', episode.id)}
            >
              {episode.episode}
            </SubItem>
          ))}
        </SubMenuItems>
      )}
    </MenuContainer>
  )
}
