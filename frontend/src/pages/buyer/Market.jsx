import { useEffect, useMemo, useState } from 'react'
import BuyerNav from '../../components/BuyerNav'
import { Link } from 'react-router-dom'
import { apiGet } from '../../lib/api'

// Start with empty; we load from backend
const MOCK_PRODUCTS = []

export default function Market() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [items, setItems] = useState(MOCK_PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let aborted = false
    async function load() {
      try {
        setLoading(true)
        setError('')
        const qs = new URLSearchParams()
        if (q) qs.set('q', q)
        if (category) qs.set('category', category)
        if (location) qs.set('location', location)
        if (maxPrice) qs.set('maxPrice', maxPrice)
        const data = await apiGet(`/api/listings?${qs.toString()}`)
        if (!aborted) setItems(
          data.map(l => ({
            id: l._id,
            name: l.title,
            price: l.pricePerKg,
            unit: 'kg',
            location: l.location || '',
            category: l.category || '',
            qtyAvailable: l.quantityKg || 0,
            farmer: { id: l.seller, name: 'Farmer' },
            image: (l.images && l.images[0]) || 'https://via.placeholder.com/800x600?text=Listing'
          }))
        )
      } catch (e) {
        if (!aborted) setError('Failed to load products')
      } finally {
        if (!aborted) setLoading(false)
      }
    }
    load()
    return () => { aborted = true }
  }, [q, category, location, maxPrice])

  const filtered = useMemo(() => {
    return items.filter(p => (
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.farmer.name.toLowerCase().includes(q.toLowerCase())) &&
      (!category || p.category === category) &&
      (!location || p.location.toLowerCase().includes(location.toLowerCase())) &&
      (!maxPrice || p.price <= Number(maxPrice))
    ))
  }, [items, q, category, location, maxPrice])

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

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && <div className="col-span-full text-center text-gray-600">Loading…</div>}
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


