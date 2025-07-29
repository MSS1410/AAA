import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard'
import api from '../../api'
import HomeCarrusel from '../../components/HomeCarrusels'

/**
 * Props:
 *  - category:   nombre exacto de categoría en la API (p.ej. 'Ciencia Ficción')
 *  - title:      texto a mostrar en el encabezado
 *  - viewAllLink:url a la página de listado completo (p.ej. '/categories/Ciencia%20Ficción')
 */
const CoverImage = ({ src, alt }) => <img src={src} alt={alt} />

export default function ListCategory({ category, title, viewAllLink }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    api
      .get(`/api/books?category=${encodeURIComponent(category)}&limit=12`)
      .then((res) => setBooks(res.data))
      .catch(console.error)
  }, [category])

  const items = books.map((b) => ({
    id: b._id,
    component: <CoverImage src={b.coverImage} alt={b.title} />
  }))

  return <HomeCarrusel title={title} items={items} viewAllLink={viewAllLink} />
}
