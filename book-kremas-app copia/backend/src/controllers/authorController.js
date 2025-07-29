// ================================
// File: backend/src/controllers/authorController.js
// ================================
import Author from '../models/Author.js'

// Obtiene todos los autores
export const getAllAuthors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const authors = await Author.find().skip(skip).limit(Number(limit))

    res.json(authors)
  } catch (err) {
    next(err)
  }
}

// Obtiene un autor por ID
export const getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id)
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' })
    }
    res.json(author)
  } catch (err) {
    next(err)
  }
}

// Crea un nuevo autor (solo admin)
export const createAuthor = async (req, res, next) => {
  try {
    const { name, biography, photo } = req.body
    const newAuthor = new Author({ name, biography, photo })
    const savedAuthor = await newAuthor.save()
    res.status(201).json(savedAuthor)
  } catch (err) {
    next(err)
  }
}

// Actualiza un autor existente (solo admin)
export const updateAuthor = async (req, res, next) => {
  try {
    const updates = req.body
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    )
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Autor no encontrado' })
    }
    res.json(updatedAuthor)
  } catch (err) {
    next(err)
  }
}

// Elimina un autor (solo admin)
export const deleteAuthor = async (req, res, next) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id)
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Autor no encontrado' })
    }
    res.json({ message: 'Autor eliminado correctamente' })
  } catch (err) {
    next(err)
  }
}
