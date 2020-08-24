import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import { Form, Button, FormLabel, FormControl } from 'react-bootstrap'

const BlogForm = (props) => {

  const { blogFormRef } = props

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const blog = {
      title,
      author,
      url
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.createBlog(blog)
    props.setTimedNotification(`Added ${blog.title}`, 'success', 5)
    blogFormRef.current.toggleVisibility()
  }

  return(
    <>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <FormLabel>title:</FormLabel>
          <FormControl id="title" type="text" name="Title" />
          <FormLabel>author:</FormLabel>
          <FormControl id="author" type="text" name="Author" />
          <FormLabel>url:</FormLabel>
          <FormControl id="url" type="text" name="Url" />
          <Button id="createbtn" type="submit" variant="primary">
            create
          </Button>
        </Form.Group>
      </Form>
    </>
  )

}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  createBlog,
  setTimedNotification
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm