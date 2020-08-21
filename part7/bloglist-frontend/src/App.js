import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Menu from './components/Menu'

import { setTimedNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Switch, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const user = useSelector(state => state.loggedUser)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      dispatch(setUser(user))
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(setTimedNotification('', 'success', 5))
    } catch (exception) {
      dispatch(setTimedNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = async (event) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button id="loginbtn" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Menu userName={user?.name} handleLogout={handleLogout} />
      <h2>blogs</h2>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <BlogView />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='new blog' buttonSecondLabel='cancel' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef}/>
          </Togglable>
          <BlogList user={user}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App