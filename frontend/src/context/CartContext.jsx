import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
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
  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { subtotal }
  }, [state.items])

  const value = useMemo(() => ({ state, dispatch, totals }), [state, totals])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


