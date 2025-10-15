import { useEffect, useState } from 'react'

function Navbar({ onOpenAuth }) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">DK</span>
          <span className="text-lg font-semibold">DigiKhet</span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="#seller" className="text-gray-600 hover:text-gray-900">Seller</a>
          <a href="#buyer" className="text-gray-600 hover:text-gray-900">Buyer</a>
          <a href="#deals" className="text-gray-600 hover:text-gray-900">Deals</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => onOpenAuth('login')} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50">Log in</button>
          <button onClick={() => onOpenAuth('signup')} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">Sign up</button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onOpenAuth }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid items-center gap-10 xl:grid-cols-2">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              From Farm to Table, Smarter & Fairer
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              AI guidance for better yields. A marketplace to sell directly. One platform to grow farmer income.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#how" className="rounded-lg bg-brand-600 px-5 py-3 text-white font-semibold hover:bg-brand-700">How it works</a>
              <button onClick={() => onOpenAuth('signup')} className="rounded-lg border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-50">Get Started</button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div>AI Advisor</div>
              <div>Marketplace</div>
              <div>Secure Payments</div>
            </div>
          </div>
          <div className="relative max-w-xl mx-auto">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-brand-50 via-white to-brand-100 p-6 shadow-lg ring-1 ring-inset ring-brand-100">
              <div className="grid h-full grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-700">AI Crop Advice</p>
                  <p className="mt-2 text-xs text-gray-500">Soil health, irrigation, disease alerts</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-700">Live Marketplace</p>
                  <p className="mt-2 text-xs text-gray-500">List produce, receive offers</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-700">Deals Inbox</p>
                  <p className="mt-2 text-xs text-gray-500">Negotiate with buyers</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-700">Secure Payouts</p>
                  <p className="mt-2 text-xs text-gray-500">UPI / Cards / NetBanking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryGrid() {
  const categories = [
    { name: 'Wheat', price: '₹22/kg' },
    { name: 'Rice', price: '₹28/kg' },
    { name: 'Potato', price: '₹14/kg' },
    { name: 'Onion', price: '₹18/kg' },
    { name: 'Tomato', price: '₹20/kg' },
    { name: 'Cotton', price: '₹62/kg' },
    { name: 'Mustard', price: '₹58/kg' },
    { name: 'Sugarcane', price: '₹3.2/kg' }
  ]

  return (
    <section id="categories" className="border-y border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold sm:text-2xl">Trending Categories</h2>
          <p className="mt-1 text-sm text-gray-500">Browse popular produce from verified farmers</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c.name} className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 hover:shadow-md">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{c.name}</p>
                <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{c.price}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">High quality fresh produce from verified farmers.</p>
              <button className="mt-4 inline-flex items-center rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">View Listings</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAs() {
  return (
    <section id="how" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div id="seller" className="rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold">For Farmers (Sellers)</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
            <li>AI guidance on crops, soil, irrigation, and diseases</li>
            <li>List produce with photos, quality, and quantity</li>
            <li>Receive offers, negotiate, and close deals securely</li>
          </ul>
          <a href="#deals" className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Start Selling</a>
        </div>
        <div id="buyer" className="rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold">For Buyers</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
            <li>Discover verified produce from local farmers</li>
            <li>Transparent pricing, quality, and delivery options</li>
            <li>Bulk orders and recurring contracts supported</li>
          </ul>
          <a href="#categories" className="mt-6 inline-block rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Explore Market</a>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-center text-2xl font-bold">How it Works</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[{t:'Get AI Advice',d:'Personalized recommendations for your farm.'},{t:'List or Browse',d:'Create listings or explore categories.'},{t:'Deal & Pay',d:'Chat, finalize, and pay securely.'}].map(s => (
            <div key={s.t} className="rounded-xl border border-gray-100 p-6 text-center shadow-sm">
              <p className="text-lg font-semibold">{s.t}</p>
              <p className="mt-2 text-sm text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Deals() {
  return (
    <section id="deals" className="border-y border-gray-100 bg-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xl font-bold">Deals Inbox</h3>
          <div className="mt-4 space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="text-sm font-medium">Offer #{i} • Buyer</p>
                  <p className="text-xs text-gray-500">Proposed price and quantity</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100">Counter</button>
                  <button className="rounded-md bg-brand-600 px-2 py-1 text-xs font-semibold text-white hover:bg-brand-700">Accept</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
          <h3 className="text-xl font-bold">Subscribe for Market Alerts</h3>
          <p className="mt-2 text-sm text-gray-600">Get weekly prices, best deals, and agronomy tips in your inbox.</p>
          <form className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center">
            <input type="email" required placeholder="Your email" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 sm:min-w-[140px]">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">Our Mission</h3>
          <p className="mt-4 text-gray-600">We empower rural farmers with AI-driven insights and direct market access, improving productivity and securing better prices through transparency and fair trade.</p>
          <div className="mt-6">
            <a href="#" className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">Learn More</a>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-white p-8 ring-1 ring-brand-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-extrabold text-brand-700">10k+</p>
              <p className="text-sm text-gray-500">Farmers</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-brand-700">2k+</p>
              <p className="text-sm text-gray-500">Buyers</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-brand-700">₹50cr+</p>
              <p className="text-sm text-gray-500">GMV</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">DK</span>
            <span className="font-semibold">DigiKhet</span>
          </div>
          <nav className="flex gap-4 text-sm text-gray-600">
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#deals" className="hover:text-gray-900">Deals</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </nav>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} DigiKhet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function AuthModal({ isOpen, mode, onClose }) {
  const [role, setRole] = useState('farmer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { setRole('farmer') }, [mode, isOpen])
  if (!isOpen) return null

  // Resolve API base robustly even if env accidentally points to Vite dev server
  const getApiBase = () => {
    const envUrl = import.meta.env.VITE_API_URL
    if (envUrl && /^https?:\/\//.test(envUrl)) {
      if (envUrl.includes('localhost:517')) return 'http://localhost:5000'
      return envUrl
    }
    return 'http://localhost:5000'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{mode === 'login' ? 'Log in' : 'Create account'}</h3>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">✕</button>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => setRole('farmer')} className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${role==='farmer'?'border-brand-600 text-brand-700 bg-brand-50':'border-gray-300 hover:bg-gray-50'}`}>I am a Farmer</button>
          <button onClick={() => setRole('buyer')} className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${role==='buyer'?'border-brand-600 text-brand-700 bg-brand-50':'border-gray-300 hover:bg-gray-50'}`}>I am a Buyer</button>
        </div>
        <form className="mt-4 space-y-3" onSubmit={async (e) => {
          e.preventDefault()
          setError('')
          setLoading(true)
          const form = e.currentTarget
          const formData = new FormData(form)
          const name = formData.get('name')
          const email = formData.get('email')
          const password = formData.get('password')
          const payload = mode === 'signup' ? { name, email, password, role: role === 'farmer' ? 'seller' : 'buyer' } : { email, password }
          try {
            const res = await fetch(`${getApiBase()}/api/auth/${mode}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            })
            const contentType = res.headers.get('content-type') || ''
            const data = contentType.includes('application/json') ? await res.json() : await res.text()
            if (!res.ok) {
              const msg = typeof data === 'object' && data?.message ? data.message : (data || 'Request failed')
              throw new Error(msg)
            }
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            onClose()
            const roleToRoute = data.user.role === 'seller' ? '/seller' : '/buyer'
            window.location.assign(roleToRoute)
          } catch (err) {
            setError(err.message || 'Network error. Please try again.')
          } finally { setLoading(false) }
        }}>
          {mode === 'signup' && (
            <input name="name" required type="text" placeholder={role==='farmer'?'Full name':'Company name'} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          )}
          <input name="email" required type="email" placeholder="Email" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <input name="password" required type="password" placeholder="Password" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50">{loading ? 'Please wait...' : (mode === 'login' ? 'Log in' : 'Create account')}</button>
          <p className="text-center text-xs text-gray-500">By continuing you agree to our Terms & Privacy.</p>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true) }

  return (
    <div className="min-h-full">
      <Navbar onOpenAuth={openAuth} />
      <main>
        <Hero onOpenAuth={openAuth} />
        <CategoryGrid />
        <CTAs />
        <Deals />
        <About />
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} />
    </div>
  )
}
