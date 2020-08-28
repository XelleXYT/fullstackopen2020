import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author {
    name
  }
  id
  genres
}
`

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
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
query ($genre: String!){
  allBooks  (genre: $genre){
    ...BookDetails
  }
}
${BOOK_DETAILS}
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
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`