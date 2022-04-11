export type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  location: Location
  created: string
  episode: Episode[]
}

export type Episode = {
  id: string
  name: string
  episode: string
}

export type Location = {
  id: string
  dimension: string
  residents: Character[]
  name: string
}

export type Context = {
  params: {
    id: string
    slug: string
  }
}
