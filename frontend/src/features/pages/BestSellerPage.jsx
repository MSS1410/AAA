import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../api'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const Item = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`
const Cover = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
`
const Info = styled.div`
  flex: 1;
`
const Title = styled.h3`
  margin: 0;
`
const Meta = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`
const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
`
const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing.md};
`

export default function BestSellerPage() {
  const [books, setBooks] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const perPage = 10
  const maxPage = Math.ceil(total / perPage)

  useEffect(() => {
    api
      .get(`/api/books?sort=-soldCount&limit=${perPage}&page=${page}`)
      .then((res) => {
        setBooks(res.data.books)
        setTotal(res.data.total)
        window.scrollTo(0, 0)
      })
      .catch(console.error)
  }, [page])

  return (
    <Container>
      <h2>Más Vendidos</h2>
      <List>
        {books.map((book) => (
          <Item key={book._id}>
            <Cover src={book.coverImage} alt={book.title} />
            <Info>
              <Title>{book.title}</Title>
              <Meta>Autor: {book.author.name}</Meta>
              <Meta>Precio: {book.price} €</Meta>
              <Description>{book.synopsis}</Description>
            </Info>
            <Button
              onClick={() =>
                api.post('/api/cart', { bookId: book._id, quantity: 1 })
              }
            >
              Añadir al carrito
            </Button>
          </Item>
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
