import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const Main = styled.main`
  width: 100%;
  max-width: 1800px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.md};
  min-height: calc(100vh - 200px);
`

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
