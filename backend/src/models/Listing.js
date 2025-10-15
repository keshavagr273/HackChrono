import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'Other' },
    pricePerKg: { type: Number, required: true, min: 0 },
    quantityKg: { type: Number, required: true, min: 0 },
    location: { type: String, default: '' },
    images: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Listing', listingSchema)


