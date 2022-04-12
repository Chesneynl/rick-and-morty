import { useRouter } from 'next/router'
import styled from 'styled-components'
import uniq from 'lodash/uniq'

import type { Episode, Location } from '../../lib-types/types'
import { useState } from 'react'
import Link from 'next/link'
import { phoneUp } from '../breakpoints'

const MenuContainer = styled.div`
  ${phoneUp} {
    width: 400px;
    margin-right: ${(p) => p.theme.gutters.base};
    position: sticky;
    top: 0;
    align-self: start;
  }
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

type Item = {
  href: string
  key: string
  title: string
}

type MenuCategoryProps = {
  category: string
  title: string
  toggleMenuItem: (category: string) => void
  openCategory?: string
  activeRoute: string
  items: Item[]
}

function MenuCategory({
  category,
  toggleMenuItem,
  openCategory,
  activeRoute,
  items,
  title,
}: MenuCategoryProps) {
  return (
    <>
      <Category onClick={() => toggleMenuItem(category)}>- {title}</Category>
      {openCategory === category && (
        <SubMenuItems>
          {items.map((item) => (
            <Link key={item.key} href={item.href} passHref>
              <StyledLink className={activeRoute === item.href ? 'active' : ''}>
                {item.title}
              </StyledLink>
            </Link>
          ))}
        </SubMenuItems>
      )}
    </>
  )
}

type Props = {
  episodes: Episode[]
  locations: Location[]
}

export function Menu({ episodes, locations }: Props) {
  const [openCategory, setOpenCategory] = useState<string | undefined>()
  const dimensions = uniq(locations.map((location) => location.dimension))

  const dimensionMenuItems = dimensions.map((dimension) => ({
    href: `/dimension/${encodeURIComponent(dimension)}`,
    key: dimension,
    title: dimension,
  }))

  const LocationsMenuItems = locations.map((location) => ({
    href: `/location/${location.id}`,
    key: location.id,
    title: location.name,
  }))

  const EpisodesMenuItems = episodes.map((episode) => ({
    href: `/episode/${episode.id}`,
    key: episode.id,
    title: `${episode.episode} ${episode.name}`,
  }))

  const router = useRouter()

  function toggleMenuItem(category: string) {
    if (category === openCategory) return setOpenCategory(undefined)

    setOpenCategory(category)
  }

  return (
    <MenuContainer>
      <MenuCategory
        title={'Dimensions'}
        category={'dimensions'}
        toggleMenuItem={toggleMenuItem}
        openCategory={openCategory}
        activeRoute={router.asPath}
        items={dimensionMenuItems}
      />

      <MenuCategory
        title={'Locations'}
        category={'locations'}
        toggleMenuItem={toggleMenuItem}
        openCategory={openCategory}
        activeRoute={router.asPath}
        items={LocationsMenuItems}
      />

      <MenuCategory
        title={'Episodes'}
        category={'episodes'}
        toggleMenuItem={toggleMenuItem}
        openCategory={openCategory}
        activeRoute={router.asPath}
        items={EpisodesMenuItems}
      />
    </MenuContainer>
  )
}
