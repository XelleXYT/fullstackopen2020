const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initialUsers = [
    {
        _id:'5f35066a40ab4e5368b23b18',
        username: 'Prueba1',
        name: 'Prueba1',
        password: 'Prueba1'
    },
    {
        _id:'5f3506fa40ab4e5368b23b1c',
        username: 'Prueba2',
        name: 'Prueba2',
        password: 'Prueba2'
    },
    {
        _id:'5f350b1beda9fe4f00f992dd',
        username: 'Prueba3',
        name: 'Prueba3',
        password: 'Prueba3'
    }
]

const getToken = () => {
    const user = {
        username: initialUsers[0].username,
        id: initialUsers[0]._id,
    }

    return jwt.sign(user, config.SECRET)
}

const initialBlogs = [
    {
        _id:'5f35066a40ab4e5368b23b18',
        title: 'HTML is easy',
        author: 'Alejandro Luna',
        url: 'https://xellex.es/HTML',
        user: initialUsers[0]._id
    },
    {
        _id:'5f3506e540ab4e5368b23b1b',
        title: 'Browser can execute only Javascript',
        author: 'Alejandro Luna',
        url: 'https://xellex.es/JS',
        user: initialUsers[1]._id
    }
]



const nonExistingId = async () => {
    const blog = new Blog({ title: 'temporalblog', author: 'Alejandro Luna', url: 'https://xellex.es/temp' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb, getToken
}