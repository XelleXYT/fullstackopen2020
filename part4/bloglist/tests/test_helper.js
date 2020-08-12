const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'Prueba1',
        name: 'Prueba1',
        password: 'Prueba1'
    },
    {
        username: 'Prueba2',
        name: 'Prueba2',
        password: 'Prueba2'
    },
    {
        username: 'Prueba3',
        name: 'Prueba3',
        password: 'Prueba3'
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
    initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb
}