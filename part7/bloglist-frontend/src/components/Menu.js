import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {

  const { userName, handleLogout } = props

  return(
    <div className="menu">
      <div><Link to="/">blogs</Link></div>
      <div><Link to="/users">users</Link></div>
      <div>{`${userName} logged in`} <button onClick={()=>handleLogout()}>logout</button></div>
    </div>
  )
}

export default Menu
