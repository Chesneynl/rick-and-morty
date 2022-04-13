export async function getStaticProps() {
  return {
    props: {
      episodes: [],
      characters: [],
      locations: [],
    },
  }
}

export default function Custom500() {
  return <h1>404 - Page Not Found</h1>
}
