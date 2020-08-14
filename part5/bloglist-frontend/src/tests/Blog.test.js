import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

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

/* 
  IMPORTANT:
    I've used the Togglable to do the blogs show/hide info.
    It renders all content everytime, but shows only what it need to show.
*/
describe('<Blog />', () => {
  test('shows only title and author', () => {
    const component = render(
      <Blog blog={blog} likeBlog={()=>{}} currentUser={{username:'TestUserUsername', user:'TestUserName'}} removeBlog={()=>{}}/>
    )

    const div = component.container.querySelector('.blog')
    const togglable = component.container.querySelector('.togglableContent')

    expect(div).toHaveTextContent('TestTitle')
    expect(div).toHaveTextContent('TestAuthor')
    expect(div).toHaveTextContent('TestUrl')
    expect(div).toHaveTextContent('10')
    expect(togglable).toHaveStyle('display: none')

  })

  test('shows url and likes too', () => {
    const component = render(
      <Blog blog={blog} likeBlog={()=>{}} currentUser={{username:'TestUserUsername', user:'TestUserName'}} removeBlog={()=>{}}/>
    )
    
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    const togglable = component.container.querySelector('.togglableContent')

    expect(div).toHaveTextContent('TestTitle')
    expect(div).toHaveTextContent('TestAuthor')
    expect(div).toHaveTextContent('TestUrl')
    expect(div).toHaveTextContent('10')
    expect(togglable).not.toHaveStyle('display: none')

  })

  test('hides url and likes', () => {
    const component = render(
      <Blog blog={blog} likeBlog={()=>{}} currentUser={{username:'TestUserUsername', user:'TestUserName'}} removeBlog={()=>{}}/>
    )
    
    const buttonShow = component.getByText('show')
    fireEvent.click(buttonShow)

    const togglableShow = component.container.querySelector('.togglableContent')
    expect(togglableShow).not.toHaveStyle('display: none')

    const buttonHide = component.getByText('hide')
    fireEvent.click(buttonHide)

    const div = component.container.querySelector('.blog')
    const togglableHide = component.container.querySelector('.togglableContent')

    expect(div).toHaveTextContent('TestTitle')
    expect(div).toHaveTextContent('TestAuthor')
    expect(div).toHaveTextContent('TestUrl')
    expect(div).toHaveTextContent('10')
    expect(togglableHide).toHaveStyle('display: none')

  })

  test('check like button', () => {

    const likeBlog = jest.fn()

    const component = render(
      <Blog blog={blog} likeBlog={likeBlog} currentUser={{username:'TestUserUsername', user:'TestUserName'}} removeBlog={()=>{}}/>
    )

    const button = component.getByText('like')

    expect(likeBlog.mock.calls).toHaveLength(0)
    fireEvent.click(button)
    expect(likeBlog.mock.calls).toHaveLength(1)
    fireEvent.click(button)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})