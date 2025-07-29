import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js'

const router = express.Router()
router.use(isAuth)

router.get('/', getCart) // GET    /api/cart
router.post('/', addToCart) // POST   /api/cart
router.delete('/:bookId', removeFromCart) // DELETE /api/cart/:bookId
router.delete('/', clearCart) // DELETE /api/cart

export default router
