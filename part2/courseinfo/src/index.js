import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  const { course } = props
  return(
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = (props) => {
  const { course } = props
  return(
    <>
      {course.parts.map((part)=><Part key={part.id} part={part}/>)}
    </>
  )
}

const Part = (props) => {
  const { part } = props
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = (props) => {
  const { parts } = props
  const totalEx = parts.reduce((s, p) => {
    return s + p.exercises
  },0)
  return(
    <>
      <p>
        Number of exercises {totalEx}
      </p>
    </>
  )
}

const Course = (props) => {
  const { course } = props
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Using JavaScript',
        exercises: 20,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))