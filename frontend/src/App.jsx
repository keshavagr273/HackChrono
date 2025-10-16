import { Link } from 'react-router-dom'
import Logo from './components/Logo'

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <Logo size="sm" showText={true} />
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="#seller" className="text-gray-600 hover:text-gray-900">Seller</a>
          <a href="#buyer" className="text-gray-600 hover:text-gray-900">Buyer</a>
          <a href="#deals" className="text-gray-600 hover:text-gray-900">Deals</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors duration-200">Log in</Link>
          <Link to="/signup" className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors duration-200">Sign up</Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200/20 to-orange-200/20 blur-2xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 xl:grid-cols-2">
          <div className="text-center xl:text-left">
            <div className="mb-6 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <span className="mr-2">🌱</span>
              Empowering Farmers with AI & Technology
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              From Farm to Table,{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Smarter & Fairer
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              AI guidance for better yields. A marketplace to sell directly. One platform to grow farmer income and transform agriculture.
            </p>
            <div className="mt-10 flex flex-wrap justify-center xl:justify-start gap-4">
              <Link to="/signup" className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <a href="#how" className="group rounded-xl border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 hover:border-green-500 hover:text-green-600 transition-all duration-300 hover:scale-105">
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How it works
                </span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center xl:justify-start gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-2 text-green-500">🤖</span>
                AI Advisor
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-orange-500">🛒</span>
                Marketplace
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">🔒</span>
                Secure Payments
              </div>
            </div>
          </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="aspect-[4/3] w-full rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-gray-200/50">
                <div className="grid h-full grid-cols-2 gap-4">
                  <div className="group rounded-xl bg-gray-50 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 mb-3 bg-green-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-green-700">AI Crop Advice</p>
                      <p className="mt-1 text-xs text-gray-600">Soil health, irrigation, disease alerts</p>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gray-50 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 mb-3 bg-orange-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-orange-700">Live Marketplace</p>
                      <p className="mt-1 text-xs text-gray-600">List produce, receive offers</p>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gray-50 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 mb-3 bg-blue-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700">Deals Inbox</p>
                      <p className="mt-1 text-xs text-gray-600">Negotiate with buyers</p>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gray-50 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 mb-3 bg-purple-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-purple-700">Secure Payouts</p>
                      <p className="mt-1 text-xs text-gray-600">UPI / Cards / NetBanking</p>
                    </div>
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
    { name: 'Wheat', price: '₹22/kg', icon: '🌾', color: 'from-yellow-400 to-amber-500', bgColor: 'from-yellow-50 to-amber-50' },
    { name: 'Rice', price: '₹28/kg', icon: '🍚', color: 'from-green-400 to-emerald-500', bgColor: 'from-green-50 to-emerald-50' },
    { name: 'Potato', price: '₹14/kg', icon: '🥔', color: 'from-orange-400 to-red-500', bgColor: 'from-orange-50 to-red-50' },
    { name: 'Onion', price: '₹18/kg', icon: '🧅', color: 'from-purple-400 to-pink-500', bgColor: 'from-purple-50 to-pink-50' },
    { name: 'Tomato', price: '₹20/kg', icon: '🍅', color: 'from-red-400 to-pink-500', bgColor: 'from-red-50 to-pink-50' },
    { name: 'Cotton', price: '₹62/kg', icon: '☁️', color: 'from-blue-400 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
    { name: 'Mustard', price: '₹58/kg', icon: '🌿', color: 'from-lime-400 to-green-500', bgColor: 'from-lime-50 to-green-50' },
    { name: 'Sugarcane', price: '₹3.2/kg', icon: '🎋', color: 'from-teal-400 to-green-500', bgColor: 'from-teal-50 to-green-50' }
  ]

  return (
    <section id="categories" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-green-200/20 blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-blue-200/20 blur-2xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
            <span className="mr-2">📈</span>
            Trending Now
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Categories</h2>
          <p className="mt-4 text-lg text-gray-600">Browse fresh produce from verified farmers across India</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c, index) => (
            <div key={c.name} className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-50">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{c.icon}</span>
                  </div>
                  <span className={`rounded-full bg-gradient-to-r ${c.color} px-3 py-1 text-xs font-bold text-white shadow-md`}>{c.price}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900">{c.name}</h3>
                <p className="mt-2 text-sm text-gray-600">Premium quality from verified farmers</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAs() {
  return (
    <section id="how" className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 h-64 w-64 rounded-full bg-green-200/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-800">
            <span className="mr-2">🚀</span>
            Get Started Today
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Path</h2>
          <p className="mt-4 text-lg text-gray-600">Join thousands of farmers and buyers already using our platform</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div id="seller" className="group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">👨‍🌾</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-800">For Farmers (Sellers)</h3>
              <p className="mt-2 text-gray-600">Maximize your income with AI-powered farming</p>
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">AI guidance on crops, soil, irrigation, and diseases</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">List produce with photos, quality, and quantity</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Receive offers, negotiate, and close deals securely</span>
                </li>
              </ul>
              <Link to="/signup" className="mt-8 inline-flex items-center rounded-xl bg-green-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300 hover:scale-105">
                <span>Start Selling</span>
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div id="buyer" className="group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🛒</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-800">For Buyers</h3>
              <p className="mt-2 text-gray-600">Access fresh produce directly from farmers</p>
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Discover verified produce from local farmers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Transparent pricing, quality, and delivery options</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Bulk orders and recurring contracts supported</span>
                </li>
              </ul>
              <Link to="/signup" className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                <span>Explore Market</span>
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-purple-800">
              <span className="mr-2">⚡</span>
              Simple Process
            </div>
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">How it Works</h3>
            <p className="mt-4 text-lg text-gray-600">Three simple steps to transform your farming business</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {t:'Get AI Advice',d:'Personalized recommendations for your farm.',icon:'🤖',color:'from-purple-500 to-pink-500',bgColor:'from-purple-50 to-pink-50'},
              {t:'List or Browse',d:'Create listings or explore categories.',icon:'📝',color:'from-blue-500 to-cyan-500',bgColor:'from-blue-50 to-cyan-50'},
              {t:'Deal & Pay',d:'Chat, finalize, and pay securely.',icon:'💳',color:'from-green-500 to-emerald-500',bgColor:'from-green-50 to-emerald-50'}
            ].map((s, index) => (
              <div key={s.t} className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{s.icon}</span>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-all duration-300">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-800 group-hover:text-gray-900">{s.t}</p>
                  <p className="mt-3 text-gray-600">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Deals() {
  return (
    <section id="deals" className="relative overflow-hidden bg-gray-50">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 h-32 w-32 rounded-full bg-blue-200/20 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 h-32 w-32 rounded-full bg-green-200/20 blur-2xl"></div>
      </div>
      
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="mb-6 flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg">
                <span className="text-2xl">📬</span>
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">Deals Inbox</h3>
            </div>
            <div className="space-y-4">
              {[
                {id: 1, buyer: 'Rajesh Kumar', product: 'Wheat', price: '₹25/kg', qty: '500kg'},
                {id: 2, buyer: 'Priya Sharma', product: 'Tomatoes', price: '₹22/kg', qty: '200kg'},
                {id: 3, buyer: 'Amit Singh', product: 'Potatoes', price: '₹16/kg', qty: '1000kg'}
              ].map(offer => (
                <div key={offer.id} className="group/item rounded-2xl bg-gray-50 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-800">Offer #{offer.id}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-sm font-medium text-blue-600">{offer.buyer}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{offer.product} • {offer.qty}</p>
                      <p className="text-sm font-semibold text-green-600">{offer.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                        Counter
                      </button>
                      <button className="rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-200 hover:scale-105">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📧</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-800">Subscribe for Market Alerts</h3>
            <p className="mt-4 text-gray-600">Get weekly prices, best deals, and agronomy tips delivered to your inbox.</p>
            <form className="mt-8 space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300" 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              <button className="w-full rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center">
                  <span>Subscribe Now</span>
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-500">Join 10,000+ farmers already subscribed</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-green-200/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-800">
            <span className="mr-2">🌟</span>
            Our Impact
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Transforming Agriculture Together</h2>
          <p className="mt-4 text-lg text-gray-600">Empowering farmers with technology and connecting them directly to markets</p>
        </div>
        
        <div className="grid gap-12 max-w-3xl mx-auto">
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We empower rural farmers with AI-driven insights and direct market access, improving productivity and securing better prices through transparency and fair trade. Our platform bridges the gap between traditional farming and modern technology.
              </p>
              <div className="mt-8"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-800">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-green-400/20 blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Logo size="md" showText={true} className="text-white" />
            </div>
            <p className="mb-6 text-lg text-green-100 leading-relaxed">
              Empowering farmers with AI-driven insights and direct market access. 
              Join thousands of farmers already transforming their agricultural practices.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-green-200 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#deals" className="text-green-200 hover:text-white transition-colors duration-200">Market Deals</a></li>
              <li><a href="#categories" className="text-green-200 hover:text-white transition-colors duration-200">Categories</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-green-600/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-green-200">© {new Date().getFullYear()} DigiKhet. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default function App() {
  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <CTAs />
        <Deals />
        <About />
      </main>
      <Footer />
    </div>
  )
}
