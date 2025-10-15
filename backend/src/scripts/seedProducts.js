import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Product from '../models/Product.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digikhet'

async function run() {
  await mongoose.connect(MONGODB_URI)
  await Product.deleteMany({})
  await Product.insertMany([
    {
      name: 'Fresh Tomatoes', category: 'Vegetables', price: 20, unit: 'kg', location: 'Nashik', qtyAvailable: 250,
      description: 'Ripe, juicy tomatoes harvested this week.',
      images: ['https://images.unsplash.com/photo-1546470427-226ed66f7e1e?q=80&w=1200&auto=format&fit=crop'],
      farmer: { name: 'Anand Farms', about: 'Family-run farm using natural practices.' },
      reviews: [ { userName: 'Rahul', rating: 5, comment: 'Very fresh, timely delivery.' } ]
    },
    {
      name: 'Organic Onions', category: 'Vegetables', price: 18, unit: 'kg', location: 'Pune', qtyAvailable: 500,
      description: 'Certified organic red onions with strong flavor.',
      images: ['https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop'],
      farmer: { name: 'Maya Agro', about: 'Collective of growers focusing on organic crops.' },
      reviews: []
    },
    {
      name: 'Basmati Rice', category: 'Grains', price: 65, unit: 'kg', location: 'Karnal', qtyAvailable: 1000,
      description: 'Premium long-grain aromatic rice from Karnal.',
      images: ['https://images.unsplash.com/photo-1561047029-3000e62f0a43?q=80&w=1200&auto=format&fit=crop'],
      farmer: { name: 'Karnal Agro Co-op', about: 'Co-operative with strict quality checks.' },
    },
  ])
  console.log('Seeded products')
  await mongoose.disconnect()
}

run().catch((e)=>{ console.error(e); process.exit(1) })


