import React, { useEffect, useState } from 'react'
import HomeCarrusel from '../../components/HomeCarrusels'
import AuthorSingCard from '../../components/AuthorSingCard'
import api from '../../api'

export default function authorSect() {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    api
      .get('/api/authors?featured=true&limit=12')
      .then((res) => setAuthors(res.data.slice(0, 12)))
      .catch(console.error)
  }, [])

  const items = authors.map((a) => ({
    id: a._id,
    component: <AuthorSingCard author={a} />
  }))

  return (
    <HomeCarrusel
      title='Autores Destacados'
      items={items}
      viewAllLink='/authors'
    />
  )
}
