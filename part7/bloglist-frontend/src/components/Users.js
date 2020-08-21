import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users?.map( user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)
export default ConnectedUsers