import React from 'react'
import { connect } from 'react-redux'

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
                {user.username}
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