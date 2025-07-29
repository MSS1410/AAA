import React, { useEffect, useState } from 'react'
import api from '../../api/index'
import styled from 'styled-components'
import BookCard from '../../components/BookCard'

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

export default function BooksPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    api
      .get('/api/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <Container>
      <h1>Todos los libros</h1>
      <Grid>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </Grid>
    </Container>
  )
}
