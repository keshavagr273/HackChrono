import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import Market from './pages/buyer/Market'
import ProductDetail from './pages/buyer/ProductDetail'
import Cart from './pages/buyer/Cart'
import Checkout from './pages/buyer/Checkout'
import Orders from './pages/buyer/Orders'

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
    <div className="mt-6 flex flex-wrap gap-3">
      <a href="/seller/analytics" className="rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold hover:bg-brand-700">Open Analytics</a>
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

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/buyer', element: <Market /> },
  { path: '/buyer/market', element: <Market /> },
  { path: '/buyer/product/:id', element: <ProductDetail /> },
  { path: '/buyer/cart', element: <Cart /> },
  { path: '/buyer/checkout', element: <Checkout /> },
  { path: '/buyer/orders', element: <Orders /> },
  { path: '/seller', element: <SellerDashboard /> },
  { path: '/seller/analytics', element: <SellerAnalytics /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
