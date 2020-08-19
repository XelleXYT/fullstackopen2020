const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

    case 'ADD_ANECDOTE':
      const newAnecdote = asObject(action.data.content)
      const addState = state.concat(newAnecdote)
      return addState

    case 'INIT_ANECDOTES':
      return action.data.anecdotes

    default: return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE', 
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE', 
    data: { content }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes }
  }
}

export default reducer