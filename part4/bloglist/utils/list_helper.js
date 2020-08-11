const blogsRouter = require("../controllers/blogs")
var _ = require('lodash')
const { identity } = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var likeCount = 0

    if(blogs){
        blogs.forEach(blog => {
            likeCount += blog.likes
        });
    }

    return likeCount
}

const favoriteBlog = (blogs) => {
    var favBlog = {
        title: "No blog",
        author: "",
        likes: 0
    }
    if(blogs){
        var topLikes = 0
        blogs.forEach(blog => {
            if(blog.likes > topLikes){
                topLikes = blog.likes
                favBlog = {
                    title: blog.title,
                    author: blog.author,
                    likes: blog.likes
                }
            }
        })
    }
    return favBlog
}

const mostBlogs = (blogs) => {
    var topauthor = {
        author: "No one",
        blogs: 0
    }
    if(blogs){
        var authorBlogs =_.countBy(_.map(blogs, 'author'), identity)
        var blogCount = 0
        _.forEach(authorBlogs, (value, key) => {
            if(value > blogCount){
                blogCount = value
                topauthor = {
                    author: key,
                    blogs: value
                }
            }
        })
    }
    return topauthor
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}