import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
  <div>{props.text} {props.value}</div>
  )
}

const Statistics = (props) => {
  if(props.good == 0 && props.neutral == 0 && props.bad == 0){
    return(
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <Statistic text="good" value={props.good}/>
      <Statistic text="neutral" value={props.neutral}/>
      <Statistic text="bad" value={props.bad}/>
      <Statistic text="all" value={props.good + props.neutral + props.bad}/>
      <Statistic text="average" value={(props.good*1 + props.neutral*0 + props.bad*-1)/(props.good + props.neutral + props.bad)}/>
      <Statistic text="positive" value={(props.good/(props.good + props.neutral + props.bad))*100+" %"}/>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>{setGood(good+1)}} text="good"/>
      <Button onClick={()=>{setNeutral(neutral+1)}} text="neutral"/>
      <Button onClick={()=>{setBad(bad+1)}} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)