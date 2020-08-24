import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Button, Nav } from 'react-bootstrap'

const Menu = (props) => {

  const { userName, handleLogout } = props

  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {userName
              ? <em>{`${userName} logged in`} <Button variant="outline-primary" size="sm" onClick={()=>handleLogout()}>logout</Button></em>
              : <Link to="/login">login</Link>
            }
        </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
