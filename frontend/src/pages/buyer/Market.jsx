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
    <div className="min-h-screen bg-gray-50">
      <BuyerNav />
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 h-32 w-32 rounded-full bg-green-200/20 blur-2xl"></div>
          <div className="absolute bottom-0 left-1/4 h-32 w-32 rounded-full bg-blue-200/20 blur-2xl"></div>
        </div>
        
        <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-800">
              <span className="mr-2">🛒</span>
              Fresh Marketplace
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Fresh Produce Marketplace</h1>
            <p className="mt-4 text-lg text-gray-600">Discover fresh, high-quality produce directly from verified farmers</p>
          </div>

          {/* Enhanced Filters */}
          <div className="mb-12 rounded-3xl bg-white/80 p-8 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Find Your Perfect Produce</h2>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  value={q} 
                  onChange={e=>setQ(e.target.value)} 
                  placeholder="Search products or farmers..." 
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <select 
                  value={category} 
                  onChange={e=>setCategory(e.target.value)} 
                  className="rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300"
                >
                  <option value="">All Categories</option>
                  <option>🌾 Grains</option>
                  <option>🥬 Vegetables</option>
                  <option>🌿 Oilseeds</option>
                  <option>🍎 Fruits</option>
                </select>
                <input 
                  value={location} 
                  onChange={e=>setLocation(e.target.value)} 
                  placeholder="Location" 
                  className="rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300" 
                />
                <input 
                  value={maxPrice} 
                  onChange={e=>setMaxPrice(e.target.value)} 
                  type="number" 
                  placeholder="Max Price" 
                  className="rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300" 
                />
                <button 
                  onClick={()=>{setQ('');setCategory('');setLocation('');setMaxPrice('')}} 
                  className="rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Products Grid */}
          {error && (
            <div className="mb-8 rounded-2xl bg-red-50 p-6 text-center">
              <div className="mb-2 flex justify-center">
                <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading && (
              <div className="col-span-full text-center py-20">
                <div className="mb-6 flex justify-center">
                  <div className="h-20 w-20 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading fresh produce...</h3>
                <p className="text-gray-600">Please wait while we fetch the latest listings from our farmers</p>
                <div className="mt-4 flex justify-center space-x-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
            
            {filtered.map(p => (
              <Link key={p.id} to={`/buyer/product/${p.id}`} className="group relative overflow-hidden rounded-3xl bg-white/80 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-lg backdrop-blur-sm">
                        {p.category || 'Fresh'}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow-lg backdrop-blur-sm">
                        <svg className="mr-1 h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        4.8
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-800 mb-1">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.farmer.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                          ₹{p.price}/{p.unit}
                        </span>
                        <p className="mt-1 text-xs text-gray-500">{p.qtyAvailable} {p.unit} left</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {p.location || 'Location not specified'}
                      </div>
                      <div className="flex items-center">
                        <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Fresh from farm
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Total Value: <span className="font-semibold text-gray-900">₹{(p.price * p.qtyAvailable).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors duration-300">
                        <span className="text-sm font-semibold mr-1">View Details</span>
                        <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {filtered.length === 0 && !loading && (
              <div className="col-span-full rounded-3xl border-2 border-dashed border-gray-300 bg-white/50 p-12 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any products matching your search criteria</p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Try adjusting your filters:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button 
                      onClick={() => {setQ(''); setCategory(''); setLocation(''); setMaxPrice('')}}
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors duration-200"
                    >
                      Clear All Filters
                    </button>
                    <button 
                      onClick={() => setCategory('')}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      All Categories
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}



