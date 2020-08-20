import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

const blog = {
  title: 'TestTitle',
  author: 'TestAuthor',
  url: 'TestUrl',
  likes: 10,
  user: {
    username: 'TestUserUsername',
    name: 'TestUserName'
  }
}

describe('<BlogForm />', () => {
  test('check new blog', async () => {
    const addBlog = jest.fn()

    const component = render(<BlogForm createBlog={addBlog} />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const button = component.container.querySelector('#createbtn')

    fireEvent.change(title, {
      target: { value: blog.title }
    })
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    fireEvent.change(url, {
      target: { value: blog.url }
    })
    fireEvent.click(button)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url)

  })
})