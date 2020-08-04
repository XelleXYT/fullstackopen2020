import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [points, setPoints] = useState(props.points)
  const [topAnecdote, setTopAnecdote] = useState(0)

  function setToPoints (selected) {
    const pointsAux = [...points]
    pointsAux[selected] ++
    const maxPoints = Math.max(...pointsAux)
    return (
      () => {
        setPoints(pointsAux)
        setTopAnecdote(pointsAux.indexOf(maxPoints))
      }
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <button onClick={setToPoints(selected)}>vote</button>
        <button onClick={()=>{setSelected(Math.floor(Math.random() * anecdotes.length))}}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[topAnecdote]}</div>
      <div>has {points[topAnecdote]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} points={points}/>,
  document.getElementById('root')
)