import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

function BuyerDashboard() {
  return <div className="mx-auto max-w-5xl px-4 py-10">
    <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
    <p className="mt-2 text-gray-600">Welcome to DigiKhet buyer portal.</p>
  </div>
}

function SellerDashboard() {
  return <div className="mx-auto max-w-5xl px-4 py-10">
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

    <div className="mt-8 flex flex-wrap gap-3">
      <a href="/seller/listings" className="rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold hover:bg-brand-700">Manage Listings</a>
      <a href="/seller/orders" className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Orders & Payments</a>
      <a href="/" className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Back to Home</a>
    </div>
  </div>
}

 function SellerAnalytics() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Farm Analytics</h1>
        <a href="/seller" className="text-sm text-brand-700 hover:text-brand-800">Back to Dashboard</a>
      </div>
      <p className="mt-2 text-gray-600">Insights to help plan your season. Data shown is sample for model prototyping.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">7‑Day Weather Forecast</h2>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,idx)=> (
              <div key={d} className="rounded-lg bg-gradient-to-b from-brand-50 to-white p-3 ring-1 ring-brand-100">
                <p className="font-medium">{d}</p>
                <p className="mt-1 text-gray-600">{[28,30,31,29,27,26,28][idx]}°C</p>
                <p className="text-xs text-gray-500">{["Sunny","Cloudy","Rain","Sunny","Rain","Cloudy","Sunny"][idx]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Soil Fertility Snapshot</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {[{k:'N (Nitrogen)',v:'Low'},{k:'P (Phosphorus)',v:'Optimal'},{k:'K (Potassium)',v:'Moderate'},{k:'pH',v:'6.7 (Slightly acidic)'}].map(row => (
              <div key={row.k} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span className="text-gray-600">{row.k}</span>
                <span className="font-medium">{row.v}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">Tip: Apply urea in split doses; add lime if pH {'<'} 6.0.</p>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Yield vs Weather (Last Season)</h2>
        <div className="mt-4">
          <div className="relative h-56 w-full overflow-hidden rounded-xl bg-white ring-1 ring-gray-100">
            <svg viewBox="0 0 400 160" className="h-full w-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="400" height="160" fill="#f9fafb" />
              <polyline fill="url(#g1)" stroke="#10b981" strokeWidth="2" points="0,120 50,110 100,80 150,90 200,70 250,75 300,60 350,65 400,55 400,160 0,160" />
              <polyline fill="none" stroke="#60a5fa" strokeWidth="2" points="0,100 50,95 100,60 150,70 200,50 250,55 300,45 350,50 400,40" />
              <text x="8" y="14" fontSize="10" fill="#374151">Green: Yield (q/acre), Blue: Rainfall (mm)</text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  )
}

function SellerAI() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">AI Crop Advisor</h1>
      <p className="mt-2 text-gray-600">Prototype tools to support diagnosis, recommendation and prediction.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Pest & Disease Detection</h2>
          <p className="mt-1 text-sm text-gray-600">Upload a plant image for instant hints.</p>
          <input type="file" accept="image/*" className="mt-3 block w-full rounded-lg border border-gray-300 p-2" />
          <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">Results will appear here.</div>
        </section>

        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Crop Recommendation</h2>
          <form className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <input placeholder="Soil pH" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="N (ppm)" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="P (ppm)" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="K (ppm)" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="Location" className="col-span-2 rounded-lg border border-gray-300 px-3 py-2" />
            <button className="col-span-2 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Get Suggestions</button>
          </form>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Yield Prediction</h2>
        <form className="mt-3 grid grid-cols-3 gap-3 text-sm">
          <input placeholder="Area (acre)" className="rounded-lg border border-gray-300 px-3 py-2" />
          <input placeholder="Rain (mm)" className="rounded-lg border border-gray-300 px-3 py-2" />
          <input placeholder="Fertilizer (kg/acre)" className="rounded-lg border border-gray-300 px-3 py-2" />
          <button className="col-span-3 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Predict</button>
        </form>
      </section>
    </div>
  )
}

function SellerListings() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Products / Listings</h1>
        <a href="/seller" className="text-sm text-brand-700 hover:text-brand-800">Back to Dashboard</a>
      </div>
      <form className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <input placeholder="Crop name" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input placeholder="Price per kg (₹)" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input placeholder="Quantity (kg)" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input type="file" multiple className="rounded-lg border border-gray-300 px-3 py-2" />
        <textarea placeholder="Description" className="col-span-2 h-24 rounded-lg border border-gray-300 px-3 py-2" />
        <button className="col-span-2 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Add Product</button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Wheat Grade-A","Potato Fresh","Tomato Organic"].map(p => (
          <div key={p} className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="font-semibold">{p}</p>
            <p className="text-sm text-gray-600">₹20/kg • 1000 kg</p>
            <div className="mt-3 flex gap-2 text-sm">
              <button className="rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50">Edit</button>
              <button className="rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SellerOrders() {
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

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/buyer', element: <BuyerDashboard /> },
  { path: '/seller', element: <SellerDashboard /> },
  { path: '/seller/analytics', element: <SellerAnalytics /> },
  { path: '/seller/ai', element: <SellerAI /> },
  { path: '/seller/listings', element: <SellerListings /> },
  { path: '/seller/orders', element: <SellerOrders /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
