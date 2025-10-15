import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Buyer pages
import { CartProvider } from './context/CartContext'
import Market from './pages/buyer/Market'
import ProductDetail from './pages/buyer/ProductDetail'
import Cart from './pages/buyer/Cart'
import Checkout from './pages/buyer/Checkout'
import Orders from './pages/buyer/Orders'

// Seller pages
import SellerDashboard from './pages/seller/Dashboard.jsx'
import SellerAnalytics from './pages/seller/Analytics.jsx'
import SellerAI from './pages/seller/AI.jsx'
import SellerListings from './pages/seller/Listings.jsx'
import SellerOrders from './pages/seller/Orders.jsx'
import SellerLayout from './pages/seller/Layout.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },

  // Buyer routes
  { path: '/buyer', element: <Market /> },
  { path: '/buyer/market', element: <Market /> },
  { path: '/buyer/product/:id', element: <ProductDetail /> },
  { path: '/buyer/cart', element: <Cart /> },
  { path: '/buyer/checkout', element: <Checkout /> },
  { path: '/buyer/orders', element: <Orders /> },

  // Seller routes with shared layout
  {
    path: '/seller',
    element: <SellerLayout />,
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: 'ai', element: <SellerAI /> },
      { path: 'analytics', element: <SellerAnalytics /> },
      { path: 'listings', element: <SellerListings /> },
      { path: 'orders', element: <SellerOrders /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
