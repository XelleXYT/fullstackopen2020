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

afterAll(() => {
  mongoose.connection.close()
})