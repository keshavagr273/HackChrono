import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import buyerRoutes from './routes/buyer.js'

dotenv.config()

const app = express()
app.use(express.json())

// Allow multiple dev origins (e.g., Vite chooses 5173 or 5174)
const originsEnv = process.env.CLIENT_ORIGIN || '*'
const allowedOrigins = originsEnv.split(',').map((o) => o.trim())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/buyer', buyerRoutes)

const PORT = Number(process.env.PORT || 5000)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digikhet'

async function start() {
  await mongoose.connect(MONGODB_URI)
  app.listen(PORT, () => console.log(`API listening on ${PORT}`))
}

start().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})


