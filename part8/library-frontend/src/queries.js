import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    id
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    published
    author {
      name
    }
    id
    genres
  }
}
`

export const BOOKS_BY_GENRE = gql`
query ($genre: String!){
  allBooks  (genre: $genre){
    title
    published
    author {
      name
    }
    id
  }
}
`

export const FAVORITE_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]! ) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    published
    author{
      name
    }
    id
    genres
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int! ) {
  editAuthor(
    name: $name
    setBornTo: $born
  ) {
    name
    id
    born
    bookCount
  }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`