import BuyerNav from '../../components/BuyerNav'

const MOCK_ORDERS = [
  { id: 'o1001', date: '2025-09-12', status: 'Awaiting Confirmation', items: [{ name: 'Fresh Tomatoes', qty: 50, unit: 'kg' }], total: 1000 },
  { id: 'o1000', date: '2025-08-30', status: 'Shipped', items: [{ name: 'Organic Onions', qty: 30, unit: 'kg' }], total: 540 },
]

export default function Orders() {
  return (
    <div className="min-h-full">
      <BuyerNav />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Current Orders</h2>
            <div className="mt-3 space-y-3">
              {MOCK_ORDERS.filter(o=>o.status!=='Delivered').map(o => (
                <div key={o.id} className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order {o.id}</p>
                      <p className="text-sm text-gray-600">Placed on {o.date}</p>
                    </div>
                    <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{o.status}</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                    {o.items.map((it, idx) => (<li key={idx}>{it.name} • {it.qty} {it.unit}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Order History</h2>
            <div className="mt-3 space-y-3">
              {MOCK_ORDERS.map(o => (
                <div key={o.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                  <div>
                    <p className="font-medium">Order {o.id}</p>
                    <p className="text-sm text-gray-600">{o.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{o.status}</p>
                    <p className="font-medium">₹{o.total.toFixed(2)}</p>
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


