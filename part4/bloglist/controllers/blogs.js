const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username:1,name:1})

    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if(!request.body.title || !request.body.url) {
        return response.status(400).json({
            error: 'Title and/or URL are missing'
        })  
    }

    const likes = 0

    const blog = new Blog(
        {
            author: request.body.author,
            title: request.body.title,
            url: request.body.url,
            likes,
            user
        }
    )

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true, context: 'query'})
    response.json(result)
})

module.exports = blogsRouter