import Book from '../models/Book.js'

// Controlador de libros

// Obtiene todos los libros
export const getAllBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, category, search } = req.query

    // Construir filtro
    const filter = {}
    if (category) {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') }
    }
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { 'author.name': new RegExp(search, 'i') }
      ]
    }

    // Total de documentos
    const total = await Book.countDocuments(filter)

    // Paginación
    const skip = (Number(page) - 1) * Number(limit)
    let query = Book.find(filter)
      .populate('author', 'name')
      .skip(skip)
      .limit(Number(limit))

    if (sort) query = query.sort(sort)

    const books = await query

    // Devolver paginado
    res.json({ books, total })
  } catch (err) {
    next(err)
  }
}

// Obtiene un libro por ID
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', 'name')
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    res.json(book)
  } catch (err) {
    next(err)
  }
}

// Crea un nuevo libro (solo admin)
export const createBook = async (req, res, next) => {
  try {
    const { title, author, synopsis, category, coverImage, price, stock } =
      req.body
    const newBook = new Book({
      title,
      author,
      synopsis,
      category,
      coverImage,

      price,
      stock
    })
    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
  } catch (err) {
    next(err)
  }
}

// Actualiza un libro existente (solo admin)
export const updateBook = async (req, res, next) => {
  try {
    const updates = req.body
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    })
    if (!updatedBook) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    res.json(updatedBook)
  } catch (err) {
    next(err)
  }
}

// Elimina un libro (solo admin)
export const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if (!deletedBook) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    res.json({ message: 'Libro eliminado correctamente' })
  } catch (err) {
    next(err)
  }
}
