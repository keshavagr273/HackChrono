// Simple localStorage-backed negotiation store for demo
const KEY = 'negotiations_v1'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

function save(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { }
}

export function listNegotiations(filter = {}) {
  const items = load()
  return items.filter(n => {
    for (const k in filter) if (n[k] !== filter[k]) return false
    return true
  })
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
  return item
}

export function counterOffer(id, { by, price, quantityKg }) {
  const items = load()
  const item = items.find(i => i.id === id)
  if (!item || item.status !== 'pending') return null
  item.updates.push({ type: 'counter', by, price, quantityKg, at: Date.now() })
  item.offerPricePerKg = price
  if (quantityKg) item.quantityKg = quantityKg
  save(items)
  return item
}

export function acceptOffer(id) {
  const items = load()
  const item = items.find(i => i.id === id)
  if (!item) return null
  item.status = 'accepted'
  item.acceptedAt = Date.now()
  save(items)
  return item
}

export function declineOffer(id) {
  const items = load()
  const item = items.find(i => i.id === id)
  if (!item) return null
  item.status = 'declined'
  item.declinedAt = Date.now()
  save(items)
  return item
}



