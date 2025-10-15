import { Link, useParams } from 'react-router-dom'
import BuyerNav from '../../components/BuyerNav'
import { useCart } from '../../context/CartContext'
import { useEffect, useState } from 'react'
import { apiGet, apiAuthPost } from '../../lib/api'

export default function ProductDetail() {
  const { id } = useParams()
  const { dispatch } = useCart()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    let aborted = false
    async function load() {
      try {
        setLoading(true)
        const l = await apiGet(`/api/listings/${id}`)
        if (!aborted) setProduct({
          id: l._id,
          name: l.title,
          price: l.pricePerKg,
          unit: 'kg',
          location: l.location || '',
          qtyAvailable: l.quantityKg || 0,
          description: l.description || '',
          images: l.images || [],
          farmer: { id: l.seller, name: 'Farmer', about: '' },
        })
      } catch (e) {
        if (!aborted) setError('Failed to load product')
      } finally {
        if (!aborted) setLoading(false)
      }
    }
    load()
    return () => { aborted = true }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-full">
        <BuyerNav />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-gray-600">Loading…</p>
        </div>
      </div>
    )
  }

  if (!product || error) {
    return (
      <div className="min-h-full">
        <BuyerNav />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-gray-600">Product not found.</p>
          <Link to="/buyer/market" className="mt-3 inline-block rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">Back to Market</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <BuyerNav />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-3xl"></div>
      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/buyer/market" className="hover:text-green-600 transition-colors duration-200">Marketplace</Link>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-white/80 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((src, index) => (
                  <img 
                    key={src} 
                    src={src} 
                    alt={`${product.name} ${index + 1}`} 
                    className="aspect-square w-full rounded-2xl object-cover ring-2 ring-gray-200 hover:ring-green-500 transition-all duration-300 cursor-pointer" 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {product.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Available: {product.qtyAvailable} {product.unit}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="rounded-3xl bg-white/80 p-6 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Price per {product.unit}</p>
                  <p className="text-3xl font-bold text-green-600">₹{product.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold text-gray-900">₹{(product.price * product.qtyAvailable).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="rounded-3xl bg-white/80 p-6 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selection & Actions */}
            <div className="rounded-3xl bg-white/80 p-6 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity ({product.unit})</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center rounded-xl border-2 border-gray-200">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max={product.qtyAvailable || undefined} 
                        value={qty} 
                        onChange={(e) => setQty(Number(e.target.value))} 
                        className="w-20 border-0 text-center font-semibold focus:ring-0" 
                      />
                      <button 
                        onClick={() => setQty(Math.min(product.qtyAvailable || 1, qty + 1))}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: <span className="font-semibold text-gray-900">₹{(product.price * qty).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button 
                    onClick={async () => {
                      try {
                        await apiAuthPost('/api/cart/items', { listingId: product.id, quantityKg: qty })
                      } catch {}
                      dispatch({ type: 'ADD', item: { id: product.id, name: product.name, price: product.price }, quantity: qty })
                    }} 
                    className="flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition-all duration-300 hover:shadow-lg"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={async () => {
                      try {
                        await apiAuthPost('/api/orders', { listingId: product.id, quantityKg: qty })
                        alert('Order placed!')
                      } catch (e) { alert('Failed to place order') }
                    }} 
                    className="flex items-center justify-center rounded-xl border-2 border-green-600 px-6 py-3 font-semibold text-green-600 hover:bg-green-50 transition-all duration-300"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Buy Now (COD)
                  </button>
                </div>

                <Link 
                  to="/buyer/cart" 
                  className="flex w-full items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Go to Cart
                </Link>
              </div>
            </div>

            {/* Farmer Profile */}
            <div className="rounded-3xl bg-white/80 p-6 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Farmer Profile</h3>
                  <p className="text-gray-700">{product.farmer.name}</p>
                  <p className="text-sm text-gray-600">{product.farmer.about || 'Experienced farmer with quality produce'}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                  <p className="text-xs text-gray-500">Farmer Rating</p>
                </div>
              </div>
            </div>

            {/* Reviews & Ratings */}
            <div className="rounded-3xl bg-white/80 p-6 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews & Ratings</h3>
              <div className="space-y-4">
                {(!product.reviews || product.reviews.length === 0) ? (
                  <div className="text-center py-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mx-auto mb-4">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  </div>
                ) : (
                  product.reviews.map((r, idx) => (
                    <div key={r.id} className="rounded-2xl bg-gray-50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{r.userName || 'Buyer'}</p>
                        <div className="flex items-center text-yellow-500">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < (r.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


