import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'

import { theme, Layout } from 'lib-ui'
import { apolloClient } from 'lib-graph'
import '../libs/lib-ui/styles.css'

function App({ Component, pageProps }: AppProps) {
  const { episodes, locations, characters } = pageProps

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Layout episodes={episodes} locations={locations} characters={characters}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
