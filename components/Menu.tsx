import Link from 'next/link'
import styled from 'styled-components'

const MenuContainer = styled.div`
  width: 250px;
`

const StyledLink = styled.a`
  display: block;

  &:hover {
    background: #00d69e;
    color: white;
  }
`

function MenuItem({ href, children }) {
  return (
    <Link href={href}>
      <StyledLink>{children}</StyledLink>
    </Link>
  )
}

export function Menu() {
  return (
    <MenuContainer>
      <MenuItem href="/">Characters by dimension</MenuItem>
      <MenuItem href="/test">Characters by location</MenuItem>
      <MenuItem href="/">Characters by dimension</MenuItem>
    </MenuContainer>
  )
}
