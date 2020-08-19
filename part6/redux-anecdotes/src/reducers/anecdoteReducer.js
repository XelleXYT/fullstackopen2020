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

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateAnecdote(votedAnecdote) 
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id: anecdote.id }
    })
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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default reducer