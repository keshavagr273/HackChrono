import mongoose from 'mongoose'

const aiResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['CROP_RECOMMENDATION', 'YIELD_PREDICTION', 'DISEASE_DETECTION'], required: true },
    input: { type: mongoose.Schema.Types.Mixed, required: true },
    result: { type: mongoose.Schema.Types.Mixed, required: true },
    note: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('AIResult', aiResultSchema)


