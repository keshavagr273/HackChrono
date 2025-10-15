import { Link, useParams } from 'react-router-dom'
import BuyerNav from '../../components/BuyerNav'
import { useCart } from '../../context/CartContext'

const PRODUCTS = {
  p1: { id: 'p1', name: 'Fresh Tomatoes', price: 20, unit: 'kg', location: 'Nashik', qtyAvailable: 250, description: 'Ripe, juicy tomatoes harvested this week. Great for salads and sauces.', images: [
    'https://images.unsplash.com/photo-1546470427-226ed66f7e1e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587049352851-8d3a0688d926?q=80&w=1200&auto=format&fit=crop'
  ], farmer: { id: 'f1', name: 'Anand Farms', about: 'Family-run farm using natural practices.' }, reviews: [
    { id: 'r1', user: 'Rahul', rating: 5, text: 'Very fresh, timely delivery.' },
    { id: 'r2', user: 'Sana', rating: 4, text: 'Good quality, will reorder.' },
  ]},
  p2: { id: 'p2', name: 'Organic Onions', price: 18, unit: 'kg', location: 'Pune', qtyAvailable: 500, description: 'Certified organic red onions with strong flavor.', images: [
    'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop'
  ], farmer: { id: 'f2', name: 'Maya Agro', about: 'Collective of growers focusing on organic crops.' }, reviews: []},
}

export default function ProductDetail() {
  const { id } = useParams()
  const { dispatch } = useCart()
  const product = PRODUCTS[id]

  if (!product) {
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
              {product.images.map((src)=> (
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

            <div className="mt-6 flex gap-3">
              <button onClick={()=>dispatch({ type:'ADD', item: { id: product.id, name: product.name, price: product.price } })} className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Add to Cart</button>
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
                {product.reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
                {product.reviews.map(r => (
                  <div key={r.id} className="rounded-lg bg-gray-50 p-3">
                    <p className="text-sm font-medium">{r.user} • {"★".repeat(r.rating)}</p>
                    <p className="text-sm text-gray-600">{r.text}</p>
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


