import { Router } from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()
import Cart from '../models/Cart.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
let stripe = null
try {
  const stripeSecret = process.env.STRIPE_SECRET_KEY || ''
  stripe = stripeSecret ? new Stripe(stripeSecret) : null
} catch {}

// Public: provide publishable key to frontend to avoid Vite env coupling
router.get('/config', (req, res) => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || ''
  res.json({ publishableKey })
})

router.post('/create-payment-intent', requireAuth, async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ message: 'Stripe not configured' })
    // Compute amount from server-side cart to prevent tampering
    const cart = await Cart.findOne({ buyer: req.user.id })
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' })

    const amountInPaise = cart.items.reduce((sum, i) => sum + Math.round(i.pricePerKg * 100) * i.quantityKg, 0)
    if (amountInPaise <= 0) return res.status(400).json({ message: 'Invalid amount' })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
      metadata: { buyerId: String(req.user.id) },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (e) {
    res.status(500).json({ message: e?.message || 'Failed to create payment intent' })
  }
})

export default router


