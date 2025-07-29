// backend/src/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import bookRoutes from './routes/books.js'
import authorRoutes from './routes/author.js'
import authRoutes from './routes/auth.js'
import reviewRoutes from './routes/review.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/orders.js'

import './models/Author.js'
import './models/Book.js'
import './models/User.js'

dotenv.config()

// Conectar a la base de datos
connectDB()

const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/reviews', reviewRoutes)

app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`KBOOKS back ready at  http://localhost:${PORT}`)
})
