const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}