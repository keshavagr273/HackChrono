export default function SellerOrders() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders & Payments</h1>
        <a href="/seller" className="text-sm text-brand-700 hover:text-brand-800">Back to Dashboard</a>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Current Orders</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {["#1024 • Wheat • 2,000 kg • Buyer: PayAgri","#1025 • Potato • 800 kg • Buyer: Rahul"] .map(o => (
              <li key={o} className="rounded-lg bg-gray-50 px-3 py-2">{o}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Earnings & Payouts</h2>
          <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm">
            <p>Total revenue: ₹82,450</p>
            <p>Pending payout: ₹12,600</p>
            <button className="mt-3 rounded-lg bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700">Initiate Payout</button>
          </div>
        </section>
      </div>
      <section className="mt-6 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Order History</h2>
        <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          {["#1001 • Tomato • Completed","#1002 • Onion • Completed","#1003 • Cotton • Completed","#1004 • Sugarcane • Completed"] .map(h => (
            <li key={h} className="rounded-lg bg-gray-50 px-3 py-2">{h}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}


