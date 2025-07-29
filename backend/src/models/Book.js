// backend/src/models/Book.js
import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'El autor es obligatorio']
    },
    synopsis: {
      type: String,
      required: [true, 'La sinopsis es obligatoria']
    },
    coverImage: {
      type: String, // URL a la imagen (Cloudinary o similar)
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Ciencia Ficción',
        'Aventuras',
        'Historia',
        'Psicologia',
        'Infantiles',
        'Ciencia',
        'Natura'
      ]
    }
  },
  {
    timestamps: true
  }
)

// Virtual opcional para comprobar si hay stock
bookSchema.virtual('inStock').get(function () {
  return this.stock > 0
})

const Book = mongoose.model('Book', bookSchema)
export default Book
