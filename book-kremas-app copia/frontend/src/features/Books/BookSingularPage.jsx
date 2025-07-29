import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../api'

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Cover = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
`

const Info = styled.div`
  flex: 1;
`

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`

const Meta = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0;
  color: ${({ theme }) => theme.colors.onSurface};
`

const Synopsis = styled.p`
  line-height: 1.5;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const Input = styled.input`
  width: 60px;
  padding: ${({ theme }) => theme.spacing.xs};
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.radii.sm};
  text-align: center;
`

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
`

const ReviewSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const ReviewItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid #eee;
`

export default function BookSingularPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    api
      .get(`/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(console.error)
    api
      .get(`/api/reviews/book/${id}`)
      .then((res) => setReviews(res.data))
      .catch(console.error)
  }, [id])

  const handleAddToCart = async () => {
    try {
      await api.post('/api/cart', { bookId: id, quantity })
      alert('Libro añadido al carrito')
    } catch (err) {
      console.error(err)
    }
  }

  if (!book) return <p>Cargando libro...</p>

  return (
    <Container>
      <Header>
        {book.coverImage && <Cover src={book.coverImage} alt={book.title} />}
        <Info>
          <Title>{book.title}</Title>
          <Meta>Autor: {book.author.name}</Meta>
          <Meta>Categoría: {book.category}</Meta>
          <Meta>Precio: {book.price} €</Meta>
          <Meta>Stock: {book.stock}</Meta>
          <Synopsis>{book.synopsis}</Synopsis>
          <Actions>
            <Input
              type='number'
              min='1'
              max={book.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            />
            <Button onClick={handleAddToCart} disabled={book.stock === 0}>
              {book.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
            </Button>
          </Actions>
        </Info>
      </Header>

      <ReviewSection>
        <h2>Reseñas</h2>
        {reviews.length === 0 ? (
          <p>No hay reseñas aún.</p>
        ) : (
          reviews.map((r) => (
            <ReviewItem key={r._id}>
              <strong>{r.user.name}</strong> (
              {new Date(r.createdAt).toLocaleDateString()}):
              <p>⭐ {r.rating}</p>
              <p>{r.comment}</p>
            </ReviewItem>
          ))
        )}
      </ReviewSection>
    </Container>
  )
}
