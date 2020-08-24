import React from 'react'
import { newComment } from '../reducers/blogReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const Comments = (props) => {

  const blogId = useRouteMatch('/blogs/:id')

  const blog =  blogId
  ? props.blogs?.find(b => b.id === blogId.params.id)
  : null

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    const auxBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    event.target.comment.value = ''
    props.newComment(auxBlog, comment)
    props.setTimedNotification(`Added comment`, 'success', 5)
  }

  return (
    blog ?
    <>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input id="comment" type="text" name="Comment" />
        </div>
        <button id="newcommentbtn" type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, index) => 
          <li key={index}>{c}</li>
        )}
      </ul>
    </>
    : null
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  newComment,
  setTimedNotification
}

const ConnectedComments = connect(mapStateToProps, mapDispatchToProps)(Comments)
export default ConnectedComments