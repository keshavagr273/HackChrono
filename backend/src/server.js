import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import listingsRoutes from './routes/listings.js'
import ordersRoutes from './routes/orders.js'
import sellerRoutes from './routes/seller.js'
import buyerRoutes from './routes/buyer.js'
import cartRoutes from './routes/cart.js'
import stripeRoutes from './routes/stripe.js'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import aiRoutes from './routes/ai.js'
import voiceRoutes from './routes/voice.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
app.use(express.json({ limit: '10mb' }))

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

const io = new SocketIOServer(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  }
})

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    if (room) socket.join(room)
  })
  socket.on('neg:update', (payload) => {
    io.to('negotiations').emit('neg:update', payload || { ts: Date.now() })
  })
  socket.on('neg:upsert', (payload) => {
    if (payload && payload.item) io.to('negotiations').emit('neg:upsert', payload)
  })
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingsRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/seller', sellerRoutes)
app.use('/api/buyer', buyerRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payments', stripeRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/voice', voiceRoutes)

const PORT = Number(process.env.PORT || 5000)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digikhet'

async function start() {
  await mongoose.connect(MONGODB_URI)
  server.listen(PORT, () => console.log(`API + Socket.IO listening on ${PORT}`))
}

start().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})


