import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.onSurface};
  padding: 2rem;
  text-align: center;
  font-size: 0.9rem;
`

const ContactLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <p>KBook Store – Calle Falsa 123, Ciudad, País</p>
      <p>Teléfono: +1 (555) 123-4567</p>
      <p>
        Síguenos en{' '}
        <a
          href='https://twitter.com/kbookstore'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </a>
        ,{' '}
        <a
          href='https://facebook.com/kbookstore'
          target='_blank'
          rel='noopener noreferrer'
        >
          Facebook
        </a>
      </p>
      <p>
        <ContactLink to='/contact'>Contáctanos</ContactLink>
      </p>
    </FooterContainer>
  )
}
