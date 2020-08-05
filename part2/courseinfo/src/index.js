import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  const { course } = props
  return(
    <>
      <h2>{course.name}</h2>
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
  const totalEx = parts.reduce((s, p) => s + p.exercises,0)
  return(
    <>
      <h4>
        total of {totalEx} exercises
      </h4>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course)=><Course key={course.id} course={course}/>)}
    </> 
  )
}

ReactDOM.render(<App />, document.getElementById('root'))