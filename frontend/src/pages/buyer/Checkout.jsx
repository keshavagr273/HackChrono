import BuyerNav from '../../components/BuyerNav'
import { useCart } from '../../context/CartContext'
import { apiAuthDelete, apiAuthPost } from '../../lib/api'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { apiGet } from '../../lib/api'
import { useMemo, useState } from 'react'

function CheckoutInner() {
  const { state, totals, dispatch } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  async function handlePay(e) {
    e.preventDefault()
    if (!stripe || !elements) return
    try {
      setLoading(true)
      const { clientSecret } = await apiAuthPost('/api/payments/create-payment-intent')
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      })
      if (result.error) throw new Error(result.error.message)
      const pid = result.paymentIntent.id
      for (const i of state.items) {
        await apiAuthPost('/api/orders', { listingId: i.id, quantityKg: i.quantity, paymentId: pid })
      }
      try { await apiAuthDelete('/api/cart') } catch {}
      dispatch({ type: 'CLEAR' })
      alert('Payment successful and orders placed')
    } catch (err) {
      alert(err.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <form className="space-y-3 md:col-span-2" onSubmit={handlePay}>
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
              <div className="mt-3 rounded-lg border border-gray-300 p-3">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
              <button disabled={!stripe || loading} className="mt-4 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50">
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
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

export default function Checkout() {
  const [stripePromise, setStripePromise] = useState(null)
  const [configError, setConfigError] = useState('')
  useMemo(() => {
    let aborted = false
    ;(async () => {
      try {
        const data = await apiGet('/api/payments/config')
        let key = data.publishableKey
        if (!key) {
          // Fallback to Vite env if backend key not provided
          key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
        }
        if (!aborted && key) {
          setStripePromise(loadStripe(key))
        }
        if (!key && !aborted) setConfigError('Stripe publishable key is missing. Set STRIPE_PUBLISHABLE_KEY on backend or VITE_STRIPE_PUBLISHABLE_KEY on frontend.')
      } catch {
        if (!aborted) setConfigError('Failed to load payment configuration')
      }
    })()
    return () => { aborted = true }
  }, [])

  if (!stripePromise) {
    return (
      <div className="min-h-full">
        <BuyerNav />
        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="mt-4 text-gray-600">{configError || 'Loading payment configuration...'}</p>
        </main>
      </div>
    )
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInner />
    </Elements>
  )
}


