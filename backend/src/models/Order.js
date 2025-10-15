import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, default: 'kg' },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    buyer: { id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, name: { type: String, required: true } },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['Awaiting Confirmation', 'Shipped', 'Delivered', 'Cancelled'], default: 'Awaiting Confirmation', index: true },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)


