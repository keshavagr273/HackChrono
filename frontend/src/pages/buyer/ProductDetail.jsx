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
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images?.map((src)=> (
                <img key={src} src={src} alt="thumb" className="h-20 w-full rounded-lg object-cover ring-1 ring-gray-200" />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-1 text-gray-600">{product.location}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="rounded-md bg-brand-50 px-2 py-1 text-sm font-semibold text-brand-700">₹{product.price}/{product.unit}</span>
              <span className="text-sm text-gray-500">Available: {product.qtyAvailable} {product.unit}</span>
            </div>

            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <label className="text-sm text-gray-600">Quantity (kg)</label>
              <input type="number" min="1" max={product.qtyAvailable || undefined} value={qty} onChange={(e)=>setQty(Number(e.target.value))} className="w-24 rounded-lg border border-gray-300 px-2 py-1" />
              <button onClick={()=>dispatch({ type:'ADD', item: { id: product.id, name: product.name, price: product.price }, quantity: qty })} className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Add to Cart</button>
              <button onClick={async ()=>{
                try {
                  await apiAuthPost('/api/orders', { listing: product.id, quantityKg: qty, pricePerKg: product.price, amount: product.price * qty, paymentMethod: 'cod' })
                  alert('Order placed!')
                } catch (e) { alert('Failed to place order') }
              }} className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Buy Now (COD)</button>
              <Link to="/buyer/cart" className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Go to Cart</Link>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Farmer Profile</h2>
              <p className="mt-1 text-gray-700">{product.farmer.name}</p>
              <p className="text-sm text-gray-600">{product.farmer.about}</p>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Reviews & Ratings</h2>
              <div className="mt-2 space-y-3">
                {(!product.reviews || product.reviews.length === 0) && <p className="text-sm text-gray-500">No reviews yet.</p>}
                {product.reviews?.map((r, idx) => (
                  <div key={r.id} className="rounded-lg bg-gray-50 p-3">
                    <p className="text-sm font-medium">{r.userName || 'Buyer'} • {"★".repeat(r.rating || 0)}</p>
                    <p className="text-sm text-gray-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


