import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listNegotiations, counterOffer, acceptOffer, declineOffer, subscribeNegotiations } from '../../context/Negotiation'

export default function SellerOrders() {
  const [offers, setOffers] = useState([])
  useEffect(() => {
    const apply = () => setOffers(listNegotiations({}))
    apply()
    const unsub = subscribeNegotiations(apply)
    return unsub
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders & Payments</h1>
            <p className="mt-1 text-gray-600">Track your orders and manage payments</p>
          </div>
          <Link to="/seller" className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Offers Inbox */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Offers Inbox</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
            {/* Pending */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Pending</h3>
              {offers.filter(o=>o.status==='pending').length===0 ? (
                <p className="text-gray-600">No pending offers.</p>
              ) : (
                <div className="space-y-3">
                  {offers.filter(o=>o.status==='pending').map(o => (
                    <div key={o.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                      <div>
                        <p className="font-semibold text-gray-900">{o.productName} • {o.quantityKg} kg</p>
                        <p className="text-sm text-gray-600">Buyer: {o.buyerName} • Offer: ₹{o.offerPricePerKg}/kg • Status: {o.status}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          {o.updates.map((u, idx) => (
                            <span key={idx} className="mr-2">[{new Date(u.at).toLocaleTimeString()} {u.by}: {u.type}{u.price?` ₹${u.price}`:''}]</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={()=>{ counterOffer(o.id, { by: 'seller', price: o.offerPricePerKg + 1 }); }} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Counter +₹1</button>
                        <button onClick={()=>{ acceptOffer(o.id); }} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700">Accept</button>
                        <button onClick={()=>{ declineOffer(o.id); }} className="rounded-lg border border-red-300 text-red-600 px-3 py-1.5 text-sm hover:bg-red-50">Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Completed */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Completed</h3>
              {offers.filter(o=>o.status!=='pending').length===0 ? (
                <p className="text-gray-600">No completed offers.</p>
              ) : (
                <div className="space-y-3">
                  {offers.filter(o=>o.status!=='pending').map(o => (
                    <div key={o.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-gray-50">
                      <div>
                        <p className="font-semibold text-gray-900">{o.productName} • {o.quantityKg} kg</p>
                        <p className="text-sm text-gray-600">Buyer: {o.buyerName} • Final: ₹{o.offerPricePerKg}/kg • {o.status.toUpperCase()}</p>
                      </div>
                      <div className="text-sm font-medium {o.status==='accepted'?'text-green-700':'text-red-600'}">
                        {o.status === 'accepted' ? 'Accepted' : 'Declined'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Orders</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-4">When customers place orders for your products, they'll appear here.</p>
              <Link to="/seller/listings" className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Products
              </Link>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No completed orders</h3>
              <p className="text-gray-600">Completed orders will be shown here for your reference.</p>
            </div>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings & Payouts</h2>
          
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">₹0</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">₹0</div>
              <div className="text-sm text-gray-600">Pending Payout</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">₹0</div>
              <div className="text-sm text-gray-600">Paid Out</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700">
              Request Payout
            </button>
            <button className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              View Transaction History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


