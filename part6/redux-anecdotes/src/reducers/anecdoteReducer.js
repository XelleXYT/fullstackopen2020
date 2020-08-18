const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {

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

export default reducer