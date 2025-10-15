import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    quantityKg: { type: Number, required: true, min: 0 },
    pricePerKg: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], default: 'pending' },
    paymentId: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
