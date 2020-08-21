import React from 'react'
import { connect } from 'react-redux'
import { setTimedNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = (props) => {

  return(
    <div className="blogs">
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} currentUser={props.user} />
      )}
    </div>
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