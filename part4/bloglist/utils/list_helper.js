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

module.exports = {
    dummy, totalLikes
}