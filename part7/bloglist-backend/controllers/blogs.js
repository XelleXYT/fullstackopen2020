const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response, next) => {
    try{
        const blogs = await Blog
            .find({})
            .populate('user', {username:1,name:1})

        response.json(blogs.map(b => b.toJSON()))
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
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
    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)

        if(user._id.toString() !== blog.user.toString()){
            return response.status(403).json({'error': 'You cannot delete others blogs'})
        }

        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (e) {
        next(e)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try{
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        }

        const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true, context: 'query'})
        response.json(result)
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const comment = request.body.comment
        const blog = await Blog.findById(request.params.id)

        blog.comments = blog.comments.concat(comment)
        await blog.save()
        response.status(200).end()

    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter