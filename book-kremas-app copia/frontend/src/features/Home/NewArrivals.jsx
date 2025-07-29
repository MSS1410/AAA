import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard'
import api from '../../api/index'
import styled from 'styled-components'
import HomeCarrusel from '../../components/HomeCarrusels'

const SectionNew = styled.section`
  margin-bottom: 2rem;
`
const TitleNew = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`
const GridNew = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`
const CoverImage = ({ src, alt }) => <img src={src} alt={alt} />

export default function NewArrivalsSect() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    api
      .get('/api/books?sort=createdAt&limit=8')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err))
  }, [])
  const booksCarr = books.map((b) => ({
    id: b._id,
    component: <CoverImage src={b.coverImage} alt={b.title} />
  }))

  return (
    <HomeCarrusel
      title='Nuevas Publicaciones'
      items={booksCarr}
      viewAllLink='/new-arrivals'
    />
  )
}
