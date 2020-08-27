import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(()=>{
    if(!result.loading) setBooks(result.data.allBooks)
  },[result])

  books.map(b => {
    b.genres.forEach(g => {
      if(!genres.includes(g)){
        setGenres(genres.concat(g))
      }
    })
    return null
  })
  
  useEffect(()=>{
    if(genre){
      setBooksToShow(books.filter(b => b.genres.includes(genre)))
   } else {
     setBooksToShow(books)
   }
  },[genre, books])
  
  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g=>
        <button key={g} onClick={()=>setGenre(g)} >{g}</button>
      )}
      <button onClick={()=>setGenre(null)}>All genres</button>
    </div>
  )
}

export default Books