const blogsRouter = require("../controllers/blogs")

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
        autor: "",
        likes: 0
    }
    if(blogs){
        var topLikes = 0
        blogs.forEach(blog => {
            if(blog.likes > topLikes){
                topLikes = blog.likes
                favBlog = {
                    title: blog.title,
                    autor: blog.autor,
                    likes: blog.likes
                }
            }
        });
    }
    return favBlog
}
module.exports = {
    dummy, totalLikes, favoriteBlog
}