import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE, ALL_BOOKS } from '../queries'

const RecommendedBooks = (props) => {
  const [favGenre, setFavGenre] = useState('')
  const [books, setBooks] = useState([])

  const favoriteGenreQuery = useQuery(FAVORITE_GENRE)
  const booksQuery = useQuery(ALL_BOOKS)

  useEffect(()=>{
    if(!favoriteGenreQuery.loading) setFavGenre(favoriteGenreQuery.data.me.favoriteGenre)
  },[favoriteGenreQuery])

  useEffect(()=>{
    if(!booksQuery.loading) {
      if(favGenre){
        setBooks(booksQuery.data.allBooks.filter(b=>b.genres.includes(favGenre)))
      } else {
        setBooks(booksQuery.data.allBooks)
      }
    }
  },[booksQuery, favGenre])

  useEffect(()=>{
    if(!favoriteGenreQuery.data) return
  },[favoriteGenreQuery.data])

  if(!props.show) return null
  if(favoriteGenreQuery.loading) {
    return <div>loading...</div>
  }

  return(
    <div>
      <h3>recommendations</h3>
      <div>books in your favorite genre <b>{favGenre}</b></div>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks