import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

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
        <ul>
          {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </ul>
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