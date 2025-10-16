// Simple localStorage-backed negotiation store with Socket.IO for realtime updates
import { io } from 'socket.io-client'
const KEY = 'negotiations_v2'
let socket = null

function getSocket() {
  if (socket) return socket
  try {
    const base = import.meta?.env?.VITE_API_BASE || process.env.VITE_API_BASE || 'http://localhost:5000'
    socket = io(base, { withCredentials: true })
    // Join a shared room for all negotiation updates
    socket.emit('join', 'negotiations')
  } catch { }
  return socket
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

function save(items, opts = {}) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { }
  try { window.dispatchEvent(new Event('neg:update')) } catch { }
  if (!opts.silentSocket) {
    try { getSocket()?.emit('neg:update', { ts: Date.now() }) } catch { }
  }
}

function upsertLocal(item) {
  const items = load()
  const idx = items.findIndex(i => i.id === item.id)
  if (idx >= 0) items[idx] = item
  else items.unshift(item)
  save(items, { silentSocket: true })
}

export function listNegotiations(filter = {}) {
  const items = load()
  return items.filter(n => {
    for (const k in filter) if (filter[k] !== undefined && n[k] !== filter[k]) return false
    return true
  })
}

export function getLatestForBuyerProduct({ buyerId, productId }) {
  const all = listNegotiations({})
  return all.find(n => n.buyerId === buyerId && n.productId === productId) || null
}

export function subscribeNegotiations(callback) {
  const handler = () => callback()
  window.addEventListener('storage', handler)
  window.addEventListener('neg:update', handler)
  try {
    const s = getSocket()
    s?.on('neg:update', handler)
    s?.on('neg:upsert', (payload) => {
      if (payload && payload.item) upsertLocal(payload.item)
    })
  } catch { }
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('neg:update', handler)
    try {
      const s = getSocket()
      s?.off('neg:update', handler)
      s?.off('neg:upsert')
    } catch { }
  }
}

export function createOffer({ productId, productName, sellerId, sellerName, buyerId, buyerName, quantityKg, offerPricePerKg }) {
  const items = load()
  const id = 'neg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
  const item = {
    id,
    productId, productName,
    sellerId, sellerName,
    buyerId, buyerName,
    quantityKg, offerPricePerKg,
    status: 'pending',
    createdAt: Date.now(),
    updates: [{ type: 'offer', by: 'buyer', price: offerPricePerKg, quantityKg, at: Date.now() }]
  }
  items.unshift(item)
  save(items)
  try { getSocket()?.emit('neg:upsert', { item }) } catch { }
  return item
}

export function counterOffer(id, { by, price, quantityKg }) {
  const items = load()
  const item = items.find(i => i.id === id)
  if (!item || item.status !== 'pending') return null
  item.updates.push({ type: 'counter', by, price, quantityKg: quantityKg || item.quantityKg, at: Date.now() })
  item.offerPricePerKg = price
  if (quantityKg) item.quantityKg = quantityKg
  save(items)
  try { getSocket()?.emit('neg:upsert', { item }) } catch { }
  return item
}

export function acceptOffer(id) {
  const items = load()
  const item = items.find(i => i.id === id)
  if (!item) return null
  item.status = 'accepted'
  item.acceptedAt = Date.now()
  item.updates.push({ type: 'accepted', by: 'seller', at: Date.now() })
  save(items)
  try { getSocket()?.emit('neg:upsert', { item }) } catch { }
  return item
}

export function declineOffer(id) {
  const items = load()
  const item = items.find(i => i.id === id)
  if (!item) return null
  item.status = 'declined'
  item.declinedAt = Date.now()
  item.updates.push({ type: 'declined', by: 'seller', at: Date.now() })
  save(items)
  try { getSocket()?.emit('neg:upsert', { item }) } catch { }
  return item
}


