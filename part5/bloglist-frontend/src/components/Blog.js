import React from 'react'
import Togglable from './Togglable'
const Blog = (props) => {

  const {blog} = props

  return(
    <div className='blog'>
      <div className='blog-item'><b>{blog.title} - {blog.author}</b></div>
      <Togglable buttonLabel='show' buttonSecondLabel='hide'>
        <div className='blog-item'><a href={blog.url}>{blog.url}</a></div>
        <div className='blog-item'>likes {blog.likes} <button>like</button></div>
        <div className='blog-item'>{blog.user.name}</div>
      </Togglable>
    </div>
  )
}
  

export default Blog
