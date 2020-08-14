import React, { useState } from 'react'
import Togglable from './Togglable'
const Blog = (props) => {

  const {blog, likeBlog} = props

  const [likes, setLikes] = useState(blog.likes)

  const addLike = async (event) => {
    try {
      event.preventDefault()
      await likeBlog({
        _id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1
      })
      setLikes(likes + 1)
    } catch (e) {
      console.error(e)
    }
    
  }

  return(
    <div className='blog'>
      <div className='blog-item'><b>{blog.title} - {blog.author}</b></div>
      <Togglable buttonLabel='show' buttonSecondLabel='hide'>
        <div className='blog-item'><a href={blog.url}>{blog.url}</a></div>
        <div className='blog-item'>likes {likes} <button onClick={addLike}>like</button></div>
        <div className='blog-item'>{blog.user.name}</div>
      </Togglable>
    </div>
  )
}
  

export default Blog
