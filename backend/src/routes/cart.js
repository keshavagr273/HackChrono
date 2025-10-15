import { Router } from 'express'
import Cart from '../models/Cart.js'
import Listing from '../models/Listing.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

async function getOrCreateCart(buyerId) {
  let cart = await Cart.findOne({ buyer: buyerId })
  if (!cart) cart = await Cart.create({ buyer: buyerId, items: [] })
  return cart
}

// GET current cart
router.get('/', requireAuth, async (req, res) => {
  const cart = await getOrCreateCart(req.user.id)
  res.json(cart)
})

// POST add item { listingId, quantityKg }
router.post('/items', requireAuth, async (req, res) => {
  const { listingId, quantityKg } = req.body
  if (!listingId || !quantityKg) return res.status(400).json({ message: 'Missing fields' })
  const listing = await Listing.findById(listingId)
  if (!listing || !listing.isActive) return res.status(404).json({ message: 'Listing not available' })
  const cart = await getOrCreateCart(req.user.id)
  const idx = cart.items.findIndex(i => String(i.listing) === String(listingId))
  if (idx >= 0) {
    cart.items[idx].quantityKg += Number(quantityKg)
  } else {
    cart.items.push({ listing: listing._id, name: listing.title, pricePerKg: listing.pricePerKg, quantityKg: Number(quantityKg) })
  }
  await cart.save()
  res.status(201).json(cart)
})

// PATCH update quantity { quantityKg }
router.patch('/items/:listingId', requireAuth, async (req, res) => {
  const { listingId } = req.params
  const { quantityKg } = req.body
  if (!quantityKg || Number(quantityKg) < 1) return res.status(400).json({ message: 'Invalid quantity' })
  const cart = await getOrCreateCart(req.user.id)
  const idx = cart.items.findIndex(i => String(i.listing) === String(listingId))
  if (idx < 0) return res.status(404).json({ message: 'Item not in cart' })
  cart.items[idx].quantityKg = Number(quantityKg)
  await cart.save()
  res.json(cart)
})

// DELETE remove item
router.delete('/items/:listingId', requireAuth, async (req, res) => {
  const { listingId } = req.params
  const cart = await getOrCreateCart(req.user.id)
  cart.items = cart.items.filter(i => String(i.listing) !== String(listingId))
  await cart.save()
  res.json(cart)
})

// DELETE clear cart
router.delete('/', requireAuth, async (req, res) => {
  const cart = await getOrCreateCart(req.user.id)
  cart.items = []
  await cart.save()
  res.json(cart)
})

export default router


