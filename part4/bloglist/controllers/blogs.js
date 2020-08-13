const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username:1,name:1})

    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    
    if(!request.body.title || !request.body.url) {
        return response.status(400).json({
            error: 'Title and/or URL are missing'
        })  
    }

    const user = await User.findOne()

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