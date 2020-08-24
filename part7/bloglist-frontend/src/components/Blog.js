import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = (props) => {

  const { blog } = props

  return(
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </td>
      <td>
        {blog.author}
      </td>
    </tr>
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

const mapDispatchToProps = {}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
