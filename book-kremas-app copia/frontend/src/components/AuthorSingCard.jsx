import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm};
`

const Photo = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Name = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
`

const Bio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.onSurface};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function AuthorSingCard({ author }) {
  return (
    <Card>
      {author.photo && <Photo src={author.photo} alt={author.name} />}
      <Name>{author.name}</Name>
      <Bio>{author.biography || 'Sin biografía disponible.'}</Bio>
    </Card>
  )
}
