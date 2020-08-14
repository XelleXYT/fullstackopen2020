import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders title and author', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    user: {
        username: 'TestUserUsername',
        name: 'TestUserName'
    }
  }

  const component = render(
    <Blog blog={blog} likeBlog={()=>{}} currentUser={{username:'TestUserUsername', user:'TestUserName'}} removeBlog={()=>{}}/>
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('TestTitle')
  expect(div).toHaveTextContent('TestAuthor')
})