import Review from '../models/Review.js'

// Obtener todas las reseñas de un libro
export const getReviewsByBook = async (req, res, next) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate(
      'user',
      'name'
    )
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}

// Crear una reseña (solo usuarios autenticados)
export const createReview = async (req, res, next) => {
  try {
    const { book, rating, comment } = req.body
    const newReview = new Review({
      user: req.user._id,
      book,
      rating,
      comment
    })
    const savedReview = await newReview.save()
    res.status(201).json(savedReview)
  } catch (err) {
    next(err)
  }
}

// Actualizar reseña (propietario o admin)
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review)
      return res.status(404).json({ message: 'Reseña no encontrada' })
    // Solo propietario o admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para editar esta reseña' })
    }
    const updates = req.body
    const updated = await Review.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

// Eliminar reseña (propietario o admin)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review)
      return res.status(404).json({ message: 'Reseña no encontrada' })
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para eliminar esta reseña' })
    }
    await Review.findByIdAndDelete(req.params.id)
    res.json({ message: 'Reseña eliminada correctamente' })
  } catch (err) {
    next(err)
  }
}

export const getAllReviews = async (req, res, next) => {
  try {
    // parsea query params
    const limit = parseInt(req.query.limit) || 10
    const sort = req.query.sort || '-createdAt'
    // build query
    const reviews = await Review.find()
      .sort(sort)
      .limit(limit)
      .populate('user', 'name')
      .populate('book', 'title')
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}
