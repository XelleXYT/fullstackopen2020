import React from 'react'

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

  export default Course
