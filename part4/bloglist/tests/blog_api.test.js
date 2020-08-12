const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const { forEach } = require('lodash')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/HTML'
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/JS'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (var i = 0; i < initialBlogs.length; i++){
    let blogObject = new Blog(initialBlogs[i])
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(title).toContain('HTML is easy')
})

test('verify that the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')

  const id = response.body.map(r => r.id)[0]

  expect(id).toBeDefined()
})

test('verify that _id is not defined', async () => {
  const response = await api.get('/api/blogs')

  const _id = response.body.map(r => r._id)[0]

  expect(_id).not.toBeDefined()
})

test('create a new blog post', async () => {

  const newBlog = new Blog({
    title: 'Nuevo blog',
    author: 'Alejandro Luna',
    url: 'https://google.es'
  })
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(titles).toContain('Nuevo blog')

})

test('if likes empty it will default 0', async () => {

  const newBlog = new Blog({
    title: 'Likes empty',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/likes'
  })
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const responseBlog = response.body.map(r => r)[initialBlogs.length]

  console.log(responseBlog)

  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(responseBlog).toBeDefined()
  expect(responseBlog.title).toBe('Likes empty')
  expect(responseBlog.likes).toBe(0)

})

afterAll(() => {
  mongoose.connection.close()
})