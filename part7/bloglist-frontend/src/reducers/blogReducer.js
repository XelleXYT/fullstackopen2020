import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data

    case 'NEW_BLOG':
      return [...state, action.data]

    case 'LIKE_BLOG':
      const likedBlog = state.find(e => e.id === action.data.id)
      const auxBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      }
      const likeState = state.map(blog => {
        if(blog.id === action.data.id){
          return auxBlog
        } else {
          return blog
        }
      })
      return likeState

    case 'DELETE_BLOG':
      const deletedBlog = state.find(e => e.id === action.data.id)
      const newBlogs = state.filter(b => b.id !== deletedBlog.id)
      return newBlogs

    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(likedBlog.id, likedBlog) 
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: blog.id }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
     await blogService.remove(blog.id)
     dispatch({
       type: 'DELETE_BLOG',
       data: {id: blog.id}
     })
  }
}

export default reducer