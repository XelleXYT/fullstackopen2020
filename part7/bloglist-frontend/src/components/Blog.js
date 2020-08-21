import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const Blog = (props) => {

  const { blog, currentUser } = props

  const likeBlog = () => {
    props.likeBlog(blog)
    props.setTimedNotification(`Liked ${blog.title}`,'success',5)
  }

  const deleteBlog = () => {
    
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      props.deleteBlog(blog)
      props.setTimedNotification(`Removed blog ${blog.title} by ${blog.author}`, 'success', 5)
    }
  }

  const showRemoveBlog = () => {
    return (
      currentUser.username === blog.user.username
        ? <div><button onClick={()=>deleteBlog()}>remove</button></div>
        : null
    )
  }

  return(
    <div className='blog'>
      <div className='blog-item'><b>{blog.title} - {blog.author}</b></div>
      <Togglable buttonLabel='show' buttonSecondLabel='hide'>
        <div className='blog-item'><a href={blog.url}>{blog.url}</a></div>
        <div className='blog-item'>likes {blog.likes} <button onClick={()=>likeBlog()}>like</button></div>
        <div className='blog-item'>{blog.user.name}</div>
        {showRemoveBlog()}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setTimedNotification
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
