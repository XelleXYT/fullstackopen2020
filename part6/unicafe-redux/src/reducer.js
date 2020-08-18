//import { createStore } from "redux"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {

  const zeroState = { good: 0, ok: 0, bad: 0 }

  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'ZERO':
      return zeroState
    default: return state
  }
  
}

/*
const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

store.dispatch({type: 'GOOD'})
store.dispatch({type: 'GOOD'})
store.dispatch({type: 'GOOD'})
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'BAD' })
*/

export default counterReducer