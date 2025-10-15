import { Link, NavLink } from 'react-router-dom'

export default function BuyerNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/buyer/market" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">DK</span>
          <span className="text-lg font-semibold">DigiKhet Market</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <NavLink to="/buyer/market" className={({isActive})=>`text-gray-600 hover:text-gray-900 ${isActive?'text-gray-900 font-semibold':''}`}>Marketplace</NavLink>
          <NavLink to="/buyer/orders" className={({isActive})=>`text-gray-600 hover:text-gray-900 ${isActive?'text-gray-900 font-semibold':''}`}>My Orders</NavLink>
          <NavLink to="/buyer/cart" className={({isActive})=>`text-gray-600 hover:text-gray-900 ${isActive?'text-gray-900 font-semibold':''}`}>Cart</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/" className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50">Home</Link>
        </div>
      </div>
    </header>
  )
}


