import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { checkout, getOrders } from '../controllers/oorderController.js'

const router = express.Router()
router.use(isAuth)

router.post('/checkout', checkout)
router.get('/', getOrders)

export default router
