import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../api'
import HomeCarrusel from '../../components/HomeCarrusels'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`
const Name = styled.h3`
  margin: 0;
`
const Bio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`
const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 5

  useEffect(() => {
    api
      .get(`/api/authors?limit=${perPage}&page=${page}`)
      .then((res) => setAuthors(res.data))
      .catch(console.error)
  }, [page])

  return (
    <Container>
      <h2>Autores</h2>
      {authors.map((auth) => {
        // Ensure books array
        const books = Array.isArray(auth.books) ? auth.books : []
        const items = books.map((b) => ({
          id: b._id,
          component: <img src={b.coverImage} alt={b.title} />
        }))
        return (
          <Grid key={auth._id}>
            <Avatar src={auth.photo} alt={auth.name} />
            <div>
              <Name>{auth.name}</Name>
              <Bio>{auth.biography}</Bio>
            </div>
            <HomeCarrusel
              title={`Libros de ${auth.name}`}
              items={items}
              viewAllLink={`/books?author=${auth._id}`}
            />
          </Grid>
        )
      })}
      <div>
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </Button>
        <Button onClick={() => setPage((p) => p + 1)}>Siguiente</Button>
      </div>
    </Container>
  )
}
