import { Router } from 'express'
import Listing from '../models/Listing.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: list all active listings with optional filters
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, location } = req.query
    const filter = { isActive: true }
    if (q) filter.title = { $regex: q, $options: 'i' }
    if (category) filter.category = category
    if (location) filter.location = { $regex: location, $options: 'i' }
    if (minPrice || maxPrice) filter.pricePerKg = {}
    if (minPrice) filter.pricePerKg.$gte = Number(minPrice)
    if (maxPrice) filter.pricePerKg.$lte = Number(maxPrice)

    const items = await Listing.find(filter).sort({ createdAt: -1 }).limit(100)
    res.json(items)
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch listings' })
  }
})

// Public: single listing
router.get('/:id', async (req, res) => {
  try {
    const item = await Listing.findById(req.params.id)
    if (!item || !item.isActive) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (e) {
    res.status(404).json({ message: 'Not found' })
  }
})

// Seller: list own listings
router.get('/mine/self', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ message: 'Only sellers' })
    const items = await Listing.find({ seller: req.user.id }).sort({ createdAt: -1 })
    res.json(items)
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch' })
  }
})

// Seller: create listing
router.post('/', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ message: 'Only sellers can create listings' })
    const body = req.body || {}
    const item = await Listing.create({
      seller: req.user.id,
      title: body.title,
      description: body.description || '',
      category: body.category || 'Other',
      pricePerKg: Number(body.pricePerKg),
      quantityKg: Number(body.quantityKg),
      location: body.location || '',
      // images can be URLs or base64 strings (frontend can upload to storage later)
      images: Array.isArray(body.images) ? body.images.slice(0, 6) : (body.image ? [body.image] : []),
      isActive: true,
    })
    res.status(201).json(item)
  } catch (e) {
    res.status(400).json({ message: 'Invalid listing data' })
  }
})

// Seller: update own listing
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const item = await Listing.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    if (String(item.seller) !== req.user.id) return res.status(403).json({ message: 'Not your listing' })
    const body = req.body || {}
    Object.assign(item, {
      title: body.title ?? item.title,
      description: body.description ?? item.description,
      category: body.category ?? item.category,
      pricePerKg: body.pricePerKg ?? item.pricePerKg,
      quantityKg: body.quantityKg ?? item.quantityKg,
      location: body.location ?? item.location,
      images: body.images ?? item.images,
      isActive: body.isActive ?? item.isActive,
    })
    await item.save()
    res.json(item)
  } catch (e) {
    res.status(400).json({ message: 'Update failed' })
  }
})

// Seller: delete own listing
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const item = await Listing.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    if (String(item.seller) !== req.user.id) return res.status(403).json({ message: 'Not your listing' })
    await item.deleteOne()
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ message: 'Delete failed' })
  }
})

export default router


