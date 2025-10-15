import BuyerNav from '../../components/BuyerNav'
import { useCart } from '../../context/CartContext'
import { apiAuthPost } from '../../lib/api'

export default function Checkout() {
  const { state, totals, dispatch } = useCart()

  return (
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <form className="space-y-3 md:col-span-2" onSubmit={async (e)=>{e.preventDefault(); try { for (const i of state.items) { await apiAuthPost('/api/orders', { listingId: i.id, quantityKg: i.quantity, paymentId: 'test-payment' }) } try { await apiAuthDelete('/api/cart') } catch {} alert('Payment processed and orders placed'); dispatch({ type:'CLEAR' }) } catch (err) { alert('Failed to place order(s)') } }}>
            <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Delivery Address</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input required placeholder="Full Name" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required type="tel" placeholder="Phone" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required placeholder="Address Line 1" className="sm:col-span-2 rounded-lg border border-gray-300 px-3 py-2" />
                <input placeholder="Address Line 2" className="sm:col-span-2 rounded-lg border border-gray-300 px-3 py-2" />
                <input required placeholder="City" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required placeholder="State" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required type="number" placeholder="PIN Code" className="rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Payment</h2>
              <p className="mt-1 text-sm text-gray-600">Secure payment via gateway (placeholder). Selecting this will place orders as Online.</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input required placeholder="Cardholder Name" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required placeholder="Card Number" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required placeholder="Expiry MM/YY" className="rounded-lg border border-gray-300 px-3 py-2" />
                <input required placeholder="CVV" className="rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <button className="mt-4 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">Pay Now</button>
            </div>
          </form>

          <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-2 space-y-2 text-sm">
              {state.items.map(i => (
                <div key={i.id} className="flex items-center justify-between">
                  <span>{i.name} × {i.quantity}</span>
                  <span>₹{(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between font-medium">
              <span>Total</span>
              <span>₹{totals.subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


