import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser al menos 1']
  },
  priceAtPurchase: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
  }
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
      min: [0, 'El total no puede ser negativo']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
