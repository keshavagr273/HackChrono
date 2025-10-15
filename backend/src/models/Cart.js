import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    name: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    quantityKg: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const cartSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
)

export default mongoose.model('Cart', cartSchema)


