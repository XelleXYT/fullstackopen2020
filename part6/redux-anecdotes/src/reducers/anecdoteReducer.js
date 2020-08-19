import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch(action.type){
    case 'VOTE_ANECDOTE':
      const votedAnecdote = state.find(e => e.id === action.data.id)
      const auxAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      const voteState = state.map(anecdote => {
        if(anecdote.id === action.data.id){
          return auxAnecdote
        } else {
          return anecdote
        }
      })
      return voteState

    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE', 
    data: { id }
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export default reducer