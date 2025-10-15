export default function SellerDashboard() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to DigiKhet seller portal.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Listings</p>
          <p className="mt-1 text-2xl font-bold">8</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">New Orders</p>
          <p className="mt-1 text-2xl font-bold">3</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="mt-1 text-2xl font-bold">₹82,450</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">AI Advisor</h2>
          <p className="mt-1 text-sm text-gray-600">Use smart tools to diagnose, plan and forecast.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/seller/ai" className="rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold hover:bg-brand-700">Open AI Tools</a>
            <a href="/seller/analytics" className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Analytics</a>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {["Order #1024 from PayAgri","Message from Buyer Rahul","Listing 'Wheat Grade-A' updated"].map(item => (
              <li key={item} className="rounded-lg bg-gray-50 px-3 py-2">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* action buttons removed as requested */}
    </div>
  )
}


