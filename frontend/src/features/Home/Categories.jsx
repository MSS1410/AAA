import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import HomeCarrusel from '../../components/HomeCarrusels'

const categories = [
  { name: 'Ciencia Ficción', img: 'src/assets/images/cienciaFiccion.webp' },
  { name: 'Ciencia', img: 'src/assets/images/ciencia.jpg' },
  { name: 'Infantiles', img: 'src/assets/images/infantil.jpg' },
  { name: 'Aventuras', img: 'src/assets/images/aventuras.jpg' },
  { name: 'Historia', img: 'src/assets/images/historia.jpg' },
  { name: 'Psicologia', img: 'src/assets/images/psicologia.jpg' },
  { name: 'Natura', img: 'src/assets/images/Natura.jpg' }
]

// Styled components for category card inside carousel
const Card = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  height: 100%;
  width: 100%;

  a {
    display: block;
    height: 100%;
    width: 100%;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover span {
    opacity: 1;
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`

const Label = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`

export default function CategoriesSect() {
  // Prepare items for the carousel
  const items = categories.map((cat) => ({
    id: cat.name,
    component: (
      <Card>
        <Link to={`/categories/${encodeURIComponent(cat.name)}`}>
          <Img src={cat.img} alt={cat.name} />
          <Label>{cat.name}</Label>
        </Link>
      </Card>
    )
  }))

  return (
    <HomeCarrusel title='Categorías' items={items} viewAllLink='/categories' />
  )
}
