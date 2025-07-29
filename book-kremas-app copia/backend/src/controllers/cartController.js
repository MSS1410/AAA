import Cart from '../models/Cart.js'
import Book from '../models/Book.js'

// Obtener el carrito del usuario
export const getCart = async (req, res, next) => {
  console.log('> getCart invoked for user:', req.user && req.user._id)
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.book',
      'title price'
    )
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
      await cart.save()
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

// Añadir o actualizar un libro en el carrito
export const addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity = 1 } = req.body
    const book = await Book.findById(bookId)
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' })

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    )
    if (itemIndex > -1) {
      // Actualizar cantidad
      cart.items[itemIndex].quantity += quantity
    } else {
      // Añadir nuevo ítem
      cart.items.push({ book: bookId, quantity })
    }

    await cart.save()
    const updated = await cart.populate('items.book', 'title price')
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

// Eliminar un libro del carrito
export const removeFromCart = async (req, res, next) => {
  try {
    const { bookId } = req.params
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })

    cart.items = cart.items.filter((item) => item.book.toString() !== bookId)
    await cart.save()
    const updated = await cart.populate('items.book', 'title price')
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

// Vaciar el carrito
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })

    await cart.clear()
    res.json({ message: 'Carrito vaciado correctamente' })
  } catch (err) {
    next(err)
  }
}
