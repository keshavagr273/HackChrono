import { Link, Outlet, useLocation } from 'react-router-dom'
import Logo from '../../components/Logo'
import VoiceAssistant from '../../components/VoiceAssistant'

export default function SellerLayout() {
  const { pathname } = useLocation()
  const tab = (to, label) => (
    <Link to={to} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${pathname===to? 'bg-green-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}>{label}</Link>
  )

  return (
    <div>
      <header className="border-b border-gray-100 bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/seller" className="flex items-center gap-2">
            <Logo size="sm" showText={true} />
          </Link>
          <div className="flex items-center gap-4">
            <span className="rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700">Seller Portal</span>
            <nav className="flex flex-wrap gap-2">
              {tab('/seller','Dashboard')}
              {tab('/seller/ai','AI Tools')}
              {tab('/seller/analytics','Analytics')}
              {tab('/seller/listings','Listings')}
              {tab('/seller/orders','Orders')}
              <Link to="/" className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50">Home</Link>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      
      {/* Voice Assistant - Available on all seller pages */}
      <VoiceAssistant />
    </div>
  )
}


