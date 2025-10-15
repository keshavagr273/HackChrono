import BuyerNav from '../../components/BuyerNav'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { apiAuthPost } from '../../lib/api'

export default function Cart() {
  const { state, dispatch, totals } = useCart()

  return (
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {state.items.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-600">Your cart is empty.</p>
            <Link to="/buyer/market" className="mt-3 inline-block rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Browse Products</Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-3">
              {state.items.map(i => (
                <div key={i.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 shadow-sm">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-600">₹{i.price} x</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" min="1" value={i.quantity} onChange={e=>dispatch({ type:'SET_QTY', id: i.id, quantity: Number(e.target.value) })} className="w-20 rounded-lg border border-gray-300 px-2 py-1" />
                    <button onClick={()=>dispatch({ type:'REMOVE', id: i.id })} className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-4">
                <Link to="/buyer/checkout" className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Checkout (Online)</Link>
                <button onClick={async ()=>{
                  try {
                    for (const i of state.items) {
                      await apiAuthPost('/api/orders', { listing: i.id, quantityKg: i.quantity, pricePerKg: i.price, amount: i.price * i.quantity, paymentMethod: 'cod' })
                    }
                    alert('Order(s) placed with Cash on Delivery')
                    dispatch({ type:'CLEAR' })
                  } catch (e) { alert('Failed to place COD orders') }
                }} className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Order with COD</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


