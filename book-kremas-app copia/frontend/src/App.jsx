import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import Layout from './components/Layout'

import HomePage from './features/Home/HomePage'
import BestSellerPage from './features/pages/BestSellerPage'
import NewArrivalsPage from './features/pages/newArrivalsPage'
import AuthorsPage from './features/pages/AuthorsPage'
import CategoryPage from './features/pages/CategoryPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import BooksPage from './features/Books/BooksPage'
import BookSingularPage from './features/Books/BookSingularPage'
import CartPage from './features/cart/CartPage'

import useAuth from './hooks/useAuth'

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to='/login' replace />
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Routes>
            {/* Página principal */}
            <Route path='/' element={<HomePage />} />

            {/* Secciones públicas */}
            <Route path='/bestsellers' element={<BestSellerPage />} />
            <Route path='/new-arrivals' element={<NewArrivalsPage />} />
            <Route path='/authors' element={<AuthorsPage />} />
            <Route path='/categories/:category' element={<CategoryPage />} />

            {/* Autenticación */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Listado y detalle de libros protegidos */}
            <Route
              path='/books'
              element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/books/:id'
              element={
                <ProtectedRoute>
                  <BookSingularPage />
                </ProtectedRoute>
              }
            />

            {/* Carrito */}
            <Route
              path='/cart'
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}
