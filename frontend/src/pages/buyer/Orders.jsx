import BuyerNav from '../../components/BuyerNav'
import { useEffect, useState } from 'react'
import { apiAuthGet } from '../../lib/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let aborted = false
    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await apiAuthGet('/api/orders')
        if (!aborted) setOrders(data)
      } catch (e) {
        if (!aborted) setError('Failed to load orders')
      } finally {
        if (!aborted) setLoading(false)
      }
    }
    load()
    return () => { aborted = true }
  }, [])
  return (
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {loading && <p className="text-sm text-gray-600">Loading…</p>}
          <section className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Current Orders</h2>
            <div className="mt-3 space-y-3">
              {orders.filter(o=>o.status!=='Delivered').map(o => (
                <div key={o.id} className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order {o._id}</p>
                      <p className="text-sm text-gray-600">Placed on {new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{o.status}</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                    {o.items.map((it, idx) => (<li key={idx}>{it.name} • {it.quantity} {it.unit}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Order History</h2>
            <div className="mt-3 space-y-3">
              {orders.map(o => (
                <div key={o._id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                  <div>
                    <p className="font-medium">Order {o._id}</p>
                    <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{o.status}</p>
                    <p className="font-medium">₹{Number(o.total).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}


