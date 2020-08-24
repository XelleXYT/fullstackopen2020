import React from 'react'
import { newComment } from '../reducers/blogReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'

const Comments = (props) => {

  const blogId = useRouteMatch('/blogs/:id')

  const blog =  blogId
  ? props.blogs?.find(b => b.id === blogId.params.id)
  : null

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    if(comment !== '') {
      const auxBlog = {
        ...blog,
        comments: blog.comments.concat(comment)
      }
      event.target.comment.value = ''
      props.newComment(auxBlog, comment)
      props.setTimedNotification(`Added comment`, 'success', 5)
    } else {
      props.setTimedNotification('The comment field must be filled', 'danger', 5)
    }
  }

  return (
    blog ?
    <>
      <h3>Comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control as="textarea" id="comment" type="text" name="Comment" />
          <Button variant="outline-primary" size="sm" id="newcommentbtn" type="submit">
            Add comment
          </Button>
        </Form.Group>
      </Form>
      <Table size="sm" striped bordered>
        <tbody>
          {blog.comments.map((c, index) => 
            <tr key={index}>
              <td>{c}</td>
            </tr>
          )}
        </tbody>
      </Table>
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