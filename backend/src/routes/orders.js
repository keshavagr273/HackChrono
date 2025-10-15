import { Router } from 'express'
import Order from '../models/Order.js'
import Listing from '../models/Listing.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Buyer creates an order after payment (payment integration to be added)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { listingId, quantityKg, paymentId } = req.body
    if (!listingId || !quantityKg) return res.status(400).json({ message: 'Missing fields' })
    const listing = await Listing.findById(listingId)
    if (!listing || !listing.isActive) return res.status(404).json({ message: 'Listing not available' })

    const qty = Number(quantityKg)
    const amount = qty * listing.pricePerKg
    const order = await Order.create({
      buyer: req.user.id,
      seller: listing.seller,
      listing: listing._id,
      quantityKg: qty,
      pricePerKg: listing.pricePerKg,
      amount,
      status: paymentId ? 'paid' : 'pending',
      paymentId: paymentId || ''
    })

    // Reduce available quantity if desired (soft enforcement)
    listing.quantityKg = Math.max(0, (listing.quantityKg || 0) - qty)
    await listing.save()

    res.status(201).json(order)
  } catch (e) {
    res.status(400).json({ message: 'Order creation failed' })
  }
})

// Seller view own orders
router.get('/seller', requireAuth, async (req, res) => {
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Forbidden' })
  const orders = await Order.find({ seller: req.user.id }).sort({ createdAt: -1 }).limit(100)
  res.json(orders)
})

// Buyer view own orders
router.get('/buyer', requireAuth, async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id }).sort({ createdAt: -1 }).limit(100)
  res.json(orders)
})

export default router


