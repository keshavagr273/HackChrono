import { Router } from 'express'
import mongoose from 'mongoose'
import { requireAuth } from '../middleware/auth.js'
import Listing from '../models/Listing.js'
import Order from '../models/Order.js'

const router = Router()

// Summary cards for dashboard
router.get('/summary', requireAuth, async (req, res) => {
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Forbidden' })
  
  try {
    const sellerId = new mongoose.Types.ObjectId(req.user.id)
    
    const [activeListings, newOrders, revenueAgg] = await Promise.all([
      Listing.countDocuments({ seller: req.user.id, isActive: true }),
      Order.countDocuments({ seller: req.user.id, status: { $in: ['pending', 'paid', 'shipped'] } }),
      Order.aggregate([
        { $match: { seller: sellerId, status: { $in: ['paid', 'shipped', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ])
    
    const revenue = revenueAgg[0]?.total || 0
    res.json({ activeListings, newOrders, revenue })
  } catch (error) {
    console.error('Dashboard summary error:', error)
    res.status(500).json({ message: 'Failed to fetch dashboard data' })
  }
})

export default router


