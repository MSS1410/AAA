import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../api'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`
const Cover = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
`
const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0.5rem 0;
`
const Meta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`
const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export default function CategoryPage() {
  const { category } = useParams()
  const [books, setBooks] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const perPage = 10
  const maxPage = Math.ceil(total / perPage)

  useEffect(() => {
    api
      .get(
        `/api/books?category=${encodeURIComponent(
          category
        )}&limit=${perPage}&page=${page}`
      )
      .then((res) => {
        setBooks(res.data.books)
        setTotal(res.data.total)
        window.scrollTo(0, 0)
      })
      .catch(console.error)
  }, [category, page])

  return (
    <Container>
      <h2>{category}</h2>
      <List>
        {books.map((b) => (
          <div key={b._id}>
            <Cover src={b.coverImage} alt={b.title} />
            <Title>{b.title}</Title>
            <Meta>{b.author.name}</Meta>
            <Meta>{b.price} €</Meta>
            <Button
              onClick={() =>
                api.post('/api/cart', { bookId: b._id, quantity: 1 })
              }
            >
              Añadir al carrito
            </Button>
          </div>
        ))}
      </List>
      <div>
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </Button>
        <Button
          disabled={page === maxPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente
        </Button>
      </div>
    </Container>
  )
}
