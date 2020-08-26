const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const config = require('./utils/config')
console.log(config.MONGODB_URI)

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

let authors = []

Author.find({}).then(result => {
  result.forEach(author => {authors.push(author)})
  mongoose.connection.close()
})

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = []

Book.find({}).then(result => {
  result.forEach(book => {books.push(book)})
  mongoose.connection.close()
})

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let auxBooks = books
      if(args.author) {
        auxBooks = auxBooks.filter(b => b.author === args.author)
      }
      if(args.genre) {
        auxBooks = auxBooks.filter(b => b.genres.includes(args.genre))
      }
      return auxBooks
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      return books.filter(b => b.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root,args) => {
      const book = {...args, id: uuid()}
      books = books.concat(book)

      if(!authors.find(a => a.name === book.author)){
        const author = {
          name: book.author,
          id: uuid(),
          born: null
        }
        authors = authors.concat(author)
      }

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)

      if(!author){
        return null
      }

      const updatedAuthor = {...author, born: args.setBornTo}
      
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)

      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})