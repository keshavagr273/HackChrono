import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

function signToken(user) {
  const payload = { id: user._id, role: user.role, name: user.name }
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' })
    if (!['buyer', 'seller'].includes(role)) return res.status(400).json({ message: 'Invalid role' })
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already registered' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash, role })
    const token = signToken(user)
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (e) {
    res.status(500).json({ message: 'Signup failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const ok = await user.comparePassword(password)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
    const token = signToken(user)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (e) {
    res.status(500).json({ message: 'Login failed' })
  }
})

export default router


