import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

  const blogFormRef = useRef()

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a,b)=> b.likes - a.likes))
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

  const handleMessage = async (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

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
      handleMessage('wrong username or password', 'error')
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
      handleMessage(`a new blog ${blogObject.title} by ${blogObject.author}`,'success')
      getBlogs()
    } catch (e) {
      handleMessage(e.message, 'error')
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
      handleMessage(`Liked: ${blogObject.title} - Total likes: ${blogObject.likes}`, 'success')
      getBlogs()
    } catch (e) {
      handleMessage(e.message, 'error')
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject._id)
      handleMessage(`Removed blog: ${blogObject.title} by ${blogObject.author}`, 'success')
      getBlogs()
    } catch (e) {
      handleMessage(e.message, 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Message message={message} type={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} type={messageType} />
      <p>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></p>
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} currentUser={user} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App