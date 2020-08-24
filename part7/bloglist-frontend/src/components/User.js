import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = (props) => {

  const userId = useRouteMatch('/users/:id')

  const user =  userId
  ? props.users?.find(u => u.id === userId.params.id)
  : null

  return (
    user ?
      <>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <Table size="sm" striped>
          <tbody>
            {user.blogs.map(b=>
              <tr key={b.id}>
               <td>{b.title}</td>
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
    users: state.users
  }
}

const mapDispatchToProps = {}

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)
export default ConnectedUser