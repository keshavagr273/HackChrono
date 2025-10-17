import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiAuthGet } from '../../lib/api'

export default function SellerOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiAuthGet('/api/orders/seller')
        setOrders(data)
      } catch (err) {
        console.error('Failed to fetch orders:', err)
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // Group orders by status
  const pendingOrders = orders.filter(o => ['pending', 'paid'].includes(o.status))
  const activeOrders = orders.filter(o => ['shipped'].includes(o.status))
  const completedOrders = orders.filter(o => ['completed', 'cancelled'].includes(o.status))

  // Calculate total earnings
  const totalEarnings = orders
    .filter(o => ['paid', 'shipped', 'completed'].includes(o.status))
    .reduce((sum, o) => sum + o.amount, 0)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Status badge color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

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

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500 mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500 mb-2">Active Orders</p>
            <p className="text-3xl font-bold text-blue-600">{pendingOrders.length + activeOrders.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500 mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalEarnings)}</p>
          </div>
        </div>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Orders</h2>
            <div className="space-y-4">
              {pendingOrders.map(order => (
                <div key={order._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{order.quantityKg} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium text-green-600">{formatCurrency(order.amount)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active/Shipped Orders */}
        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipped Orders</h2>
            <div className="space-y-4">
              {activeOrders.map(order => (
                <div key={order._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{order.quantityKg} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium text-green-600">{formatCurrency(order.amount)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        )}

        {/* No Orders State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
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
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <>
            {/* Pending & Paid Orders */}
            {pendingOrders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">New Orders ({pendingOrders.length})</h2>
                <div className="space-y-4">
                  {pendingOrders.map(order => (
                    <div key={order._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-medium text-gray-900">{order.quantityKg} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium text-green-600">{formatCurrency(order.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment</p>
                          <p className="font-medium text-gray-900">{order.paymentId ? 'Paid' : 'Pending'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipped Orders */}
            {activeOrders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">In Transit ({activeOrders.length})</h2>
                <div className="space-y-4">
                  {activeOrders.map(order => (
                    <div key={order._id} className="bg-white rounded-lg border border-purple-200 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-medium text-gray-900">{order.quantityKg} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium text-green-600">{formatCurrency(order.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment</p>
                          <p className="font-medium text-green-600">✓ Paid</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History ({completedOrders.length})</h2>
                <div className="space-y-4">
                  {completedOrders.map(order => (
                    <div key={order._id} className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-medium text-gray-900">{order.quantityKg} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium text-green-600">{formatCurrency(order.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className="font-medium text-gray-900">
                            {order.status === 'completed' ? '✓ Delivered' : 'Cancelled'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


