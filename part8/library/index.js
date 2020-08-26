const { ApolloServer, UserInputError, gql } = require('apollo-server')
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
    author: Author!
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
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      let query = []
      if(args.genre) {
        query = query.concat({ genres: { $elemMatch: { $eq: args.genre } }})
      }
      if(args.author) {
        const author = await Author.findOne({ name: args.author })
        const authorFilter = { author: author._id }
        query = query.concat(authorFilter)
      }
      if(query.length !== 0) {
        return await Book.find({ $and: query }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return await Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({author: root._id})
      return books && books.length || 0
    }
  },
  Mutation: {
    addBook: async (root,args) => {
      try {
        let author = await Author.findOne({name: args.author})
        if(!author){
          const auxAuthor = new Author({
            name: args.author
          })
          await auxAuthor.save()
          author = auxAuthor
        }
        const book = new Book({ ...args, author })
        await book.save()
        return book
      } catch (e) {
        console.error(e)
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOneAndUpdate({ name: args.name }, { $set: { born: args.setBornTo } }, {returnOriginal: false})
        if(!author){
          return null
        }
        return author
      } catch (e) {
        console.error(e)
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
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