import { useState, useEffect } from 'react'
import { apiAuthGet } from '../../lib/api'

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    activeListings: 0,
    newOrders: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch dashboard stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await apiAuthGet('/api/seller/summary')
        setStats(data)
      } catch (err) {
        console.error('Failed to fetch stats:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Welcome to your farming command center</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Listings</p>
                {loading ? (
                  <div className="h-8 w-16 animate-pulse bg-gray-200 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                )}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">New Orders</p>
                {loading ? (
                  <div className="h-8 w-16 animate-pulse bg-gray-200 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{stats.newOrders}</p>
                )}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                {loading ? (
                  <div className="h-8 w-24 animate-pulse bg-gray-200 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue)}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* AI Advisor Section */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 shadow-lg">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">AI Crop Advisor</h2>
                  <p className="text-gray-600">Smart tools for better farming decisions</p>
                </div>
              </div>
              <p className="mb-6 text-gray-600">Get personalized recommendations for pest control, crop selection, and yield optimization using advanced AI technology.</p>
              <div className="flex flex-wrap gap-3">
                <a href="/seller/ai" className="inline-flex items-center rounded-xl bg-green-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300 hover:scale-105">
                  <span>Open AI Tools</span>
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="/seller/analytics" className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                  <span>View Analytics</span>
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 shadow-lg">
                  <span className="text-3xl">📊</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-600">Your latest farming updates</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "📦", text: "Order #1024 from PayAgri", time: "2 hours ago", color: "green" },
                  { icon: "💬", text: "Message from Buyer Rahul", time: "4 hours ago", color: "blue" },
                  { icon: "✏️", text: "Listing 'Wheat Grade-A' updated", time: "1 day ago", color: "purple" }
                ].map((item, index) => (
                  <div key={index} className="group/item flex items-center rounded-xl bg-gray-50 p-4 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${item.color}-100`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-gray-900">{item.text}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


