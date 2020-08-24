import React from 'react'
import { connect } from 'react-redux'
import { setTimedNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {

  return(
    <Table striped bordered hover>
      <tbody>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} currentUser={props.user} />
      )}
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setTimedNotification
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList