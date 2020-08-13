const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs){
    let blogObject = new Blog(blog)
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

  expect(response.body).toHaveLength(helper.initialBlogs.length)
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
    _id:'3',
    title: 'Nuevo blog',
    author: 'Alejandro Luna',
    url: 'https://google.es'
  })
  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length+1)
  expect(titles).toContain('Nuevo blog')

})

test('if likes empty it will default 0', async () => {

  const newBlog = new Blog({
    _id:'3',
    title: 'Likes empty',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/likes'
  })
  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const responseBlog = response.body.map(r => r)[helper.initialBlogs.length]

  expect(response.body).toHaveLength(helper.initialBlogs.length+1)
  expect(responseBlog).toBeDefined()
  expect(responseBlog.title).toBe('Likes empty')
  expect(responseBlog.likes).toBe(0)

})

test('if title and url empty it will return *400 Bad Request*', async () => {

  const newBlog = new Blog({
    _id:'3',
    author: 'Alejandro Luna'
  })
  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('delete a blog post', async () => {

  const newBlog = new Blog({
    _id:'3',
    title: 'Blog a borrar',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/delete'
  })
  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responsePreDelete = await api.get('/api/blogs')

  expect(responsePreDelete.body).toHaveLength(helper.initialBlogs.length+1)

  const blogId = responsePreDelete.body[responsePreDelete.body.length-1].id

  await api
    .delete(`/api/blogs/${blogId}`)
    .set('authorization', `bearer ${helper.getToken()}`)
    .expect(204)

  const responsePostDelete = await api.get('/api/blogs')

  const titles = responsePostDelete.body.map(r => r.title)

  expect(responsePostDelete.body).toHaveLength(helper.initialBlogs.length)
  expect(titles).not.toContain('Blog a borrar')

})

test('update a blog post', async () => {

  var newBlog = new Blog({
    _id:'3',
    title: 'Blog a cambiar',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/delete',
    likes: 0
  })

  const newLikes = 123

  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responsePrePut = await api.get('/api/blogs')

  expect(responsePrePut.body[responsePrePut.body.length-1].likes).toBe(0)

  const blogId = responsePrePut.body[responsePrePut.body.length-1].id

  newBlog.likes = newLikes

  await api
    .put(`/api/blogs/${blogId}`)
    .send(newBlog)
    .expect(200)

  const responsePostPut = await api.get('/api/blogs')

  expect(responsePostPut.body[responsePostPut.body.length-1].likes).toBe(newLikes)
  expect(responsePostPut.body).toHaveLength(helper.initialBlogs.length+1)
})

test('get 401 Unauthorized',  async () => {
  var newBlog = new Blog({
    _id:'3',
    title: 'Unauthorized blog',
    author: 'Alejandro Luna',
    url: 'https://xellex.es/unauthorized',
    likes: 0
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})