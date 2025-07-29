// frontend/src/components/HorizontalCarousel.jsx

import React, { useRef } from 'react'
import styled from 'styled-components'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surfaceVariant};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const ViewAll = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Track = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
`

const Slide = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 180px;
  margin-right: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? 'left: 16px;' : 'right: 16px;')}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`

export default function HomeCarrusel({ title, items, viewAllLink }) {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const w = trackRef.current.clientWidth
    trackRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    (
      <HomeCarrusel
        title='Nuevas Publicaciones'
        items={items}
        viewAllLink='/new-arrivals'
      />
    ),
    (
      <HomeCarrusel
        title='Más Vendidos'
        items={items}
        viewAllLink='/bestsellers'
      />
    ),
    (
      <Wrapper>
        <TitleBar>
          <Title>{title}</Title>
          <ViewAll to={viewAllLink}>Ver todos</ViewAll>
        </TitleBar>

        <NavButton left onClick={() => scrollBy(-1)}>
          <FiChevronLeft size={24} />
        </NavButton>
        <NavButton onClick={() => scrollBy(1)}>
          <FiChevronRight size={24} />
        </NavButton>

        <Track ref={trackRef}>
          {items.map((item) => (
            <Slide key={item.id}>{item.component}</Slide>
          ))}
        </Track>
      </Wrapper>
    )
  )
}
