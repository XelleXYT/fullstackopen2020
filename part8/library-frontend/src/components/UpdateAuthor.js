import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const UpdateAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const options = props.authors.map((a)=>{
    return(
      {
        value: a.name,
        label: a.name
      }
    )
  })

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name: name.value, born: Number(born) }})

    setName('')
    setBorn('')
  }

  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select value={name} options={options} onChange={(selectedOption) => setName(selectedOption)} />
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default UpdateAuthor