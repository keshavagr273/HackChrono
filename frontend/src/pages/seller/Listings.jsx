import { useEffect, useState, useMemo, useCallback, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCard = memo(({ product, onEdit, onView }) => {
  const totalValue = useMemo(() => {
    return (product.pricePerKg * product.quantityKg).toLocaleString()
  }, [product.pricePerKg, product.quantityKg])

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-all duration-200">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-800">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{product.category || 'Uncategorized'}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
              ₹{product.pricePerKg}/kg
            </span>
            <span className="mt-1 text-xs text-gray-500">{product.quantityKg} kg</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {product.location || 'Location not specified'}
          </div>
          <div className="flex items-center">
            <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Total Value: ₹{totalValue}
          </div>
        </div>

        {product.description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-4 flex gap-2">
          <button onClick={()=>onEdit(product)} className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors duration-200">
            Edit
          </button>
          <button onClick={()=>onView(product)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            View
          </button>
        </div>
      </div>
    </div>
  )
})

export default function SellerListings() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const api = useCallback((path) => {
    let base = import.meta.env.VITE_API_URL
    if (!base || !/^https?:\/\//.test(base) || base.includes('localhost:517')) {
      base = 'http://localhost:5000'
    }
    return `${base}${path}`
  }, [])

  const token = localStorage.getItem('token')

  const fetchMine = useCallback(async () => {
    try {
      const res = await fetch(api('/api/listings/mine/self'), { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load')
      setItems(data)
    } catch (e) { setError(e.message) }
  }, [api, token])

  useEffect(() => { fetchMine() }, [fetchMine])

  // Memoize expensive calculations
  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.pricePerKg * item.quantityKg), 0)
  }, [items])

  async function onSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const body = {
      title: formData.get('title'),
      pricePerKg: Number(formData.get('pricePerKg')),
      quantityKg: Number(formData.get('quantityKg')),
      description: formData.get('description') || '',
      category: formData.get('category') || 'Other',
      location: formData.get('location') || ''
    }
    try {
      // attach base64 image if selected
      const imageFile = formData.get('image')
      if (imageFile && imageFile.size) {
        const buf = await imageFile.arrayBuffer()
        body.image = `data:${imageFile.type};base64,${btoa(String.fromCharCode(...new Uint8Array(buf)))}`
      }
      const res = await fetch(editing ? api(`/api/listings/${editing._id}`) : api('/api/listings'), {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      })
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      if (!res.ok) throw new Error(data.message || 'Create failed')
      form.reset(); fetchMine(); setShowForm(false); setEditing(null)
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Product Listings</h1>
            <p className="mt-2 text-gray-600">Manage your agricultural products and track their performance</p>
          </div>
          <div className="flex gap-3">
            <Link to="/seller" className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors duration-200"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {showForm ? 'Cancel' : 'Add New Product'}
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <p className="mt-1 text-gray-600">Fill in the details to list your agricultural product</p>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                  <input 
                    name="title" 
                    required 
                    defaultValue={editing?.title || ''}
                    placeholder="e.g., Organic Wheat, Fresh Tomatoes" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per kg (₹) *</label>
                  <input 
                    name="pricePerKg" 
                    required 
                    type="number" 
                    min="0" 
                    step="0.01"
                    defaultValue={editing?.pricePerKg ?? ''}
                    placeholder="25.00" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg) *</label>
                  <input 
                    name="quantityKg" 
                    required 
                    type="number" 
                    min="0" 
                    step="0.1"
                    defaultValue={editing?.quantityKg ?? ''}
                    placeholder="100" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    name="location" 
                    defaultValue={editing?.location || ''}
                    placeholder="e.g., Punjab, India" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    name="category" 
                    defaultValue={editing?.category || ''}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  >
                    <option value="">Select Category</option>
                    <option value="🌾 Grains">🌾 Grains</option>
                    <option value="🥬 Vegetables">🥬 Vegetables</option>
                    <option value="🌿 Oilseeds">🌿 Oilseeds</option>
                    <option value="🍎 Fruits">🍎 Fruits</option>
                    <option value="🌱 Spices">🌱 Spices</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                  <input 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={editing?.description || ''}
                  placeholder="Describe your product, farming methods, quality, etc." 
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100" 
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  type="submit"
                  disabled={loading} 
                  className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </div>
                  ) : (
                    editing ? 'Save Changes' : 'Add Product'
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null); }}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
      </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Products ({items.length})</h2>
            {items.length > 0 && (
              <div className="text-sm text-gray-600">
                Total Value: ₹{totalValue.toLocaleString()}
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products listed yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first agricultural product to the marketplace</p>
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition-all duration-300"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProductCard 
                  key={p._id} 
                  product={p} 
                  onEdit={(prod)=>{
                    setEditing(prod)
                    setShowForm(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  onView={(prod)=>{
                    navigate(`/buyer/product/${prod._id}`)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


