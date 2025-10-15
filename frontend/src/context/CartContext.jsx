import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { apiAuthDelete, apiAuthGet, apiAuthPatch, apiAuthPost } from '../lib/api'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      return { ...state, items: action.items }
    }
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.item.id ? { ...i, quantity: i.quantity + (action.quantity || 1) } : i) }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: action.quantity || 1 }] }
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    }
    case 'SET_QTY': {
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i) }
    }
    case 'CLEAR': {
      return { items: [] }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  useEffect(() => {
    // Load cart from server if logged in
    const token = localStorage.getItem('token')
    if (!token) return
    let aborted = false
    async function load() {
      try {
        const data = await apiAuthGet('/api/cart')
        if (!aborted) {
          const items = (data.items || []).map(i => ({ id: i.listing, name: i.name, price: i.pricePerKg, quantity: i.quantityKg }))
          dispatch({ type: 'LOAD', items })
        }
      } catch {}
    }
    load()
    return () => { aborted = true }
  }, [])
  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { subtotal }
  }, [state.items])

  const value = useMemo(() => ({ state, dispatch, totals }), [state, totals])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    // Graceful fallback if provider is not yet mounted (e.g., during HMR)
    return {
      state: { items: [] },
      dispatch: () => {},
      totals: { subtotal: 0 },
    }
  }
  return ctx
}


