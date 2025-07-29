import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../api/index'

// Crear contexto de autenticación\
const AuthContext = createContext()

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  // Configurar axios y almacenamiento en localStorage
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [token, user])

  // Función de login
  const login = async ({ email, password }) => {
    const response = await api.post('/api/auth/login', { email, password })
    setToken(response.data.token)
    setUser(response.data.user)
  }

  // Función de registro
  const register = async ({ name, email, password }) => {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password
    })
    setToken(response.data.token)
    setUser(response.data.user)
  }

  // Función de logout
  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para consumir contexto
export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
