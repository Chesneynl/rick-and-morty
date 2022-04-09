import type { AppProps } from 'next/app'
import apolloClient from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { Menu } from '../components'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../lib/theme'
import '../lib/styles.css'

const PageWidth = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 4px;
  color: ${(p) => p.theme.colors.primary};
`

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <PageWidth>
          <Component {...pageProps} />
        </PageWidth>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
