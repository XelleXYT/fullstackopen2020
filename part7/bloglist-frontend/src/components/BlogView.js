import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Button, Table } from 'react-bootstrap'

const BlogView = (props) => {

  const blogId = useRouteMatch('/blogs/:id')

  const blog =  blogId
  ? props.blogs?.find(b => b.id === blogId.params.id)
  : null

  const voteBlog = () => {
    if(blog) {
      props.likeBlog(blog)
      props.setTimedNotification(`Liked ${blog.title}`,'success',5)
    }
  }

  return (
    blog ?
      <>
        <h2>{blog.title} by {blog.author}</h2>
        <Table bordered hover size="sm">
          <tbody>
            <tr>
              <td>
                <a href={blog.url}>{blog.url}</a>
              </td>
            </tr>
            <tr>
              <td>
                {blog.likes} likes <Button variant="outline-success" size="sm" onClick={()=>voteBlog()}>like</Button>
              </td>
            </tr>
            <tr>
              <td>
                added by {blog.user.username}
              </td>
            </tr>
          </tbody>
        </Table>
        <Comments />
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
  likeBlog,
  setTimedNotification
}

const ConnectedBlogView = connect(mapStateToProps, mapDispatchToProps)(BlogView)
export default ConnectedBlogView