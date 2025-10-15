import { useMemo, useState } from 'react'
import BuyerNav from '../../components/BuyerNav'
import { Link } from 'react-router-dom'

const MOCK_PRODUCTS = [
  { id: 'p1', name: 'Fresh Tomatoes', price: 20, unit: 'kg', location: 'Nashik', category: 'Vegetables', qtyAvailable: 250, farmer: { id: 'f1', name: 'Anand Farms' }, image: 'https://images.unsplash.com/photo-1546470427-226ed66f7e1e?q=80&w=800&auto=format&fit=crop' },
  { id: 'p2', name: 'Organic Onions', price: 18, unit: 'kg', location: 'Pune', category: 'Vegetables', qtyAvailable: 500, farmer: { id: 'f2', name: 'Maya Agro' }, image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop' },
  { id: 'p3', name: 'Basmati Rice', price: 65, unit: 'kg', location: 'Karnal', category: 'Grains', qtyAvailable: 1000, farmer: { id: 'f3', name: 'Karnal Agro Co-op' }, image: 'https://images.unsplash.com/photo-1561047029-3000e62f0a43?q=80&w=800&auto=format&fit=crop' },
  { id: 'p4', name: 'Mustard Seeds', price: 58, unit: 'kg', location: 'Jaipur', category: 'Oilseeds', qtyAvailable: 300, farmer: { id: 'f4', name: 'Rajasthan Kisan' }, image: 'https://images.unsplash.com/photo-1514517220038-65f8d1b620b6?q=80&w=800&auto=format&fit=crop' },
]

export default function Market() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => (
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.farmer.name.toLowerCase().includes(q.toLowerCase())) &&
      (!category || p.category === category) &&
      (!location || p.location.toLowerCase().includes(location.toLowerCase())) &&
      (!maxPrice || p.price <= Number(maxPrice))
    ))
  }, [q, category, location, maxPrice])

  return (
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products or farmers" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:ml-4 md:gap-3">
            <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
              <option value="">All Categories</option>
              <option>Vegetables</option>
              <option>Grains</option>
              <option>Oilseeds</option>
            </select>
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" placeholder="Max Price" className="rounded-lg border border-gray-300 px-3 py-2" />
            <button onClick={()=>{setQ('');setCategory('');setLocation('');setMaxPrice('')}} className="rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-50">Clear</button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => (
            <Link key={p.id} to={`/buyer/product/${p.id}`} className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">₹{p.price}/{p.unit}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{p.farmer.name} • {p.location}</p>
                <p className="mt-1 text-xs text-gray-500">Available: {p.qtyAvailable} {p.unit}</p>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">No products found.</div>
          )}
        </div>
      </main>
    </div>
  )
}


