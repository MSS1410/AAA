import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi'
import useAuth from '../hooks/useAuth'

// Header top containing logo, search, icons
const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
`

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.onPrimary};
  text-decoration: none;
`

const SearchForm = styled.form`
  flex: 1;
  max-width: 500px;
  margin: 0 ${({ theme }) => theme.spacing.md};
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: 999px;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`

const SearchButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.onPrimary};
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
`

// Header bottom containing nav
const HeaderBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  position: relative;
`

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  @media (max-width: 1000px) {
    display: none;
  }
`

const NavLinkStyled = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  &:hover {
    text-decoration: underline;
  }
`

const Burger = styled(IconButton)`
  display: none;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 1000px) {
    display: block;
  }
`

const Overlay = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.surface};
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};
  z-index: 1000;
`

const CloseBtn = styled(IconButton)`
  align-self: flex-end;
`

const OverlayNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

// Navigation items for our site
const navItems = [
  { label: 'Más Vendidos', to: '/bestsellers' },
  { label: 'Nuevas Publicaciones', to: '/new-arrivals' },
  { label: 'Categorías', to: '/categories' },
  { label: 'Autores', to: '/authors' },
  { label: 'Reseñas', to: '/reviews' },
  { label: 'Contáctenos', to: '/contact' }
]

export default function Header() {
  const [query, setQuery] = useState('')
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { token, logout } = useAuth()

  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  const handleSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      navigate(`/books?search=${encodeURIComponent(q)}`)
      setQuery('')
    }
  }

  return (
    <>
      <HeaderTop>
        <Logo to='/'>KBook Store</Logo>

        {!isAuthPage && (
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type='text'
              placeholder='Buscar libros, autores, ISBN'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton type='submit'>
              <FiSearch />
            </SearchButton>
          </SearchForm>
        )}

        <Icons>
          {!isAuthPage &&
            (token ? (
              <IconButton onClick={logout} title='Logout'>
                <FiUser />
              </IconButton>
            ) : (
              <IconButton as={Link} to='/login' title='Sign In'>
                <FiUser />
              </IconButton>
            ))}

          {!isAuthPage && (
            <Link to='/cart'>
              <FiShoppingCart size={20} />
            </Link>
          )}
        </Icons>
      </HeaderTop>

      {!isAuthPage && (
        <HeaderBottom>
          <Nav>
            {navItems.map((item) => (
              <NavLinkStyled key={item.to} to={item.to}>
                {item.label}
              </NavLinkStyled>
            ))}
          </Nav>

          <Burger onClick={() => setOpenMenu(true)}>
            <FiMenu />
          </Burger>

          <Overlay open={openMenu}>
            <CloseBtn onClick={() => setOpenMenu(false)}>
              <FiX size={24} />
            </CloseBtn>
            <OverlayNav>
              {navItems.map((item) => (
                <NavLinkStyled
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpenMenu(false)}
                >
                  {item.label}
                </NavLinkStyled>
              ))}

              {token ? (
                <IconButton
                  onClick={() => {
                    logout()
                    setOpenMenu(false)
                  }}
                >
                  Logout
                </IconButton>
              ) : (
                <NavLinkStyled to='/login' onClick={() => setOpenMenu(false)}>
                  Iniciar Sesión
                </NavLinkStyled>
              )}
            </OverlayNav>
          </Overlay>
        </HeaderBottom>
      )}
    </>
  )
}
