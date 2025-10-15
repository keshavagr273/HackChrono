import { Router } from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/buyer/products?q=&category=&location=&maxPrice=
router.get('/products', async (req, res) => {
  try {
    const { q, category, location, maxPrice } = req.query
    const filter = {}
    if (q) {
      filter.$text = { $search: q }
    }
    if (category) filter.category = category
    if (location) filter.location = new RegExp(location, 'i')
    if (maxPrice) filter.price = { $lte: Number(maxPrice) }
    const products = await Product.find(filter).sort({ createdAt: -1 }).limit(60)
    res.json(products)
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

// GET /api/buyer/products/:id
router.get('/products/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json(p)
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

// POST /api/buyer/orders  (requires auth)
router.post('/orders', requireAuth, async (req, res) => {
  try {
    const { items } = req.body
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' })
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const order = await Order.create({
      buyer: { id: req.user.id, name: req.user.name },
      items,
      total,
    })
    res.status(201).json(order)
  } catch (e) {
    res.status(500).json({ message: 'Failed to create order' })
  }
})

// GET /api/buyer/orders (requires auth)
router.get('/orders', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ 'buyer.id': req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
})

export default router


