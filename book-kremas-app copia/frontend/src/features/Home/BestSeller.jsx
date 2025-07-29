import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard'
import api from '../../api/index'
import styled from 'styled-components'
import HomeCarrusel from '../../components/HomeCarrusels'

const Section = styled.section`
  margin-bottom: 2rem;
`
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`
const CoverImage = ({ src, alt }) => <img src={src} alt={alt} />
export default function BestSellerSection() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    api
      .get('/api/books?sort=soldCount&limit=8')
      .then((res) => {
        console.log('BestsellerSection got:', res.data)
        setBooks(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  // Prepara el array de items que espera el Carousel
  const booksCarr = books.map((b) => ({
    id: b._id,
    component: <CoverImage src={b.coverImage} alt={b.title} />
  }))
  return (
    <HomeCarrusel
      title='Más Vendidos'
      items={booksCarr}
      viewAllLink='/bestsellers'
    />
  )
}
