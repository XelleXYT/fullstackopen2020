import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const [uploaded, setUploaded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setUploaded(true)
  }

  const resetFields = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' type={info.type} value={info.value} onChange={info.onChange} />
        </div>
          <button>create</button> <button onClick={resetFields}>reset</button> 
      </form>
      {uploaded ? <Redirect to="/"/> : null}
    </div>
  )
  
}

export default CreateNew