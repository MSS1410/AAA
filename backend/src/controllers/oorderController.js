import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Book from '../models/Book.js'

// Crear un pedido a partir del carrito
export const checkout = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.book',
      'price stock'
    )
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' })
    }

    // Construir items de pedido y calcular total
    let total = 0
    const orderItems = []
    for (const item of cart.items) {
      if (item.quantity > item.book.stock) {
        return res
          .status(400)
          .json({ message: `No hay suficiente stock para ${item.book.title}` })
      }
      orderItems.push({
        book: item.book._id,
        quantity: item.quantity,
        priceAtPurchase: item.book.price
      })
      total += item.book.price * item.quantity

      // Descontar stock
      item.book.stock -= item.quantity
      await item.book.save()
    }

    // Crear pedido
    const order = new Order({ user: req.user._id, items: orderItems, total })
    const savedOrder = await order.save()

    // Vaciar carrito
    await cart.clear()

    res.status(201).json(savedOrder)
  } catch (err) {
    next(err)
  }
}

// Obtener pedidos del usuario (admins ven todos)
export const getOrders = async (req, res, next) => {
  try {
    let orders
    if (req.user.role === 'admin') {
      orders = await Order.find()
        .populate('items.book', 'title price')
        .populate('user', 'name email')
    } else {
      orders = await Order.find({ user: req.user._id }).populate(
        'items.book',
        'title price'
      )
    }
    res.json(orders)
  } catch (err) {
    next(err)
  }
}
