import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio']
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'El libro es obligatorio']
    },
    rating: {
      type: Number,
      required: [true, 'La puntuación es obligatoria'],
      min: [1, 'La puntuación mínima es 1'],
      max: [5, 'La puntuación máxima es 5']
    },
    comment: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

const Review = mongoose.model('Review', reviewSchema)
export default Review
