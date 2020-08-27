import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { FAVORITE_GENRE, BOOKS_BY_GENRE } from '../queries'

const RecommendedBooks = (props) => {

  const favoriteGenreQuery = useQuery(FAVORITE_GENRE)
  const [booksQuery, booksResult] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(()=>{
    if(favoriteGenreQuery.data){
      booksQuery({variables: { genre: favoriteGenreQuery.data.me.favoriteGenre }})
    } 
  },[favoriteGenreQuery.data, booksQuery])

  if(!props.show) return null

  if(favoriteGenreQuery?.loading || booksQuery?.loading) {
    return <div>loading...</div>
  }

  return(
    <div>
      <h3>recommendations</h3>
      <div>books in your favorite genre <b>{favoriteGenreQuery.data.me.favoriteGenre}</b></div>
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
          {booksResult.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks