import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000' // apunta siempre a tu backend
})

export default api
