import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { setTimedNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = (props) => {

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a,b) => b.likes - a.likes))
  }

  useEffect(() => {
    getBlogs()
  }, [])

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

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      dispatch(setTimedNotification(`a new blog ${blogObject.title} by ${blogObject.author}`,'success', 5))
      getBlogs()
    } catch (e) {
      dispatch(setTimedNotification(e.notification, 'error', 5))
    }
  }

  const newBlogForm = () => (
    <Togglable buttonLabel='new blog' buttonSecondLabel='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const likeBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject._id, blogObject)
      dispatch(setTimedNotification(`Liked: ${blogObject.title} - Total likes: ${blogObject.likes}`, 'success', 5))
      getBlogs()
    } catch (e) {
      dispatch(setTimedNotification(e.notification, 'error', 5))
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject._id)
      dispatch(setTimedNotification(`Removed blog: ${blogObject.title} by ${blogObject.author}`, 'success', 5))
      getBlogs()
    } catch (e) {
      dispatch(setTimedNotification(e.notification, 'error', 5))
    }
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
      {newBlogForm()}
      <div className="blogs">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} currentUser={user} removeBlog={removeBlog} />
      )}
      </div>
    </div>
  )
}

export default App