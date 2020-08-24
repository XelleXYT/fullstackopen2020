import React from 'react'

const Comments = (props) => {

  const { comments } = props

  return (
    <>
      <h3>comments</h3>
      <ul>
        {comments.map((c, index) => 
          <li key={index}>{c}</li>
        )}
      </ul>
    </>
  )
}

export default Comments