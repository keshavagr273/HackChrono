import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, index: true },
    price: { type: Number, required: true, index: true },
    unit: { type: String, default: 'kg' },
    location: { type: String, index: true },
    qtyAvailable: { type: Number, default: 0 },
    description: { type: String },
    images: [{ type: String }],
    farmer: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, required: true },
      about: { type: String },
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', description: 'text', 'farmer.name': 'text' })

export default mongoose.model('Product', productSchema)


