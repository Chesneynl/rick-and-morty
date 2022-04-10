import type { AppProps } from 'next/app'
import apolloClient from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { theme } from '../lib/theme'
import '../lib/styles.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
