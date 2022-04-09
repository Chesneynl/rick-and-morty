import Link from 'next/link'
import styled from 'styled-components'

const MenuContainer = styled.div`
  width: 300px;
  position: sticky;
  align-self: flex-start;
  top: ${(p) => p.theme.gutters.small};
  margin-right: ${(p) => p.theme.gutters.base};
`

const StyledLink = styled.a`
  display: block;
  padding: ${(p) => p.theme.gutters.small};
  border-radius: ${(p) => p.theme.borderRadius};
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;

  &:hover {
    background: #00d69e;
    color: white;
  }
`

type Props = {
  href: string
  children: React.ReactNode
}

function MenuItem({ href, children }: Props) {
  return (
    <Link href={href} passHref>
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
