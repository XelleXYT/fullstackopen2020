import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { setTimedNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setTimedNotification('', 'success', 5))
    } catch (exception) {
      dispatch(setTimedNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
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
      <h2>blogs</h2>
      <Notification />
      <p>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='new blog' buttonSecondLabel='cancel' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList user={user}/>
    </div>
  )
}

export default App