import styled from 'styled-components'

const StyledHeader = styled.h1`
  margin-bottom: ${(p) => p.theme.gutters.base};
  color: ${(p) => p.theme.colors.primary};
`

type Props = {
  children: React.ReactNode
}

export function Header({ children }: Props) {
  return <StyledHeader>{children}</StyledHeader>
}
