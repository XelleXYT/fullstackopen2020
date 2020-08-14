import React, { useState } from 'react'
import Togglable from './Togglable'
const Blog = (props) => {

  const {blog, likeBlog, currentUser, removeBlog} = props

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

  const deleteBlog = async (event) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      try {
        event.preventDefault()
        await removeBlog({
          _id: blog.id,
          title: blog.title,
          author: blog.author
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  const showRemoveBlog = () => {
    if(currentUser.username === blog.user.username){
      return(
        <div><button onClick={deleteBlog}>remove</button></div>
      )
    }else{
      return(<></>)
    }
  }

  return(
    <div className='blog'>
      <div className='blog-item'><b>{blog.title} - {blog.author}</b></div>
      <Togglable buttonLabel='show' buttonSecondLabel='hide'>
        <div className='blog-item'><a href={blog.url}>{blog.url}</a></div>
        <div className='blog-item'>likes {likes} <button onClick={addLike}>like</button></div>
        <div className='blog-item'>{blog.user.name}</div>
        {showRemoveBlog()}
      </Togglable>
    </div>
  )
}
  

export default Blog
