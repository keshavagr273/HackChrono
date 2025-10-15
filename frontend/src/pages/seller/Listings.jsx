import { useEffect, useState } from 'react'

export default function SellerListings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = (path) => {
    let base = import.meta.env.VITE_API_URL
    if (!base || !/^https?:\/\//.test(base) || base.includes('localhost:517')) {
      base = 'http://localhost:5000'
    }
    return `${base}${path}`
  }
  const token = localStorage.getItem('token')

  async function fetchMine() {
    try {
      const res = await fetch(api('/api/listings/mine/self'), { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load')
      setItems(data)
    } catch (e) { setError(e.message) }
  }

  useEffect(() => { fetchMine() }, [])

  async function onSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const body = {
      title: formData.get('title'),
      pricePerKg: Number(formData.get('pricePerKg')),
      quantityKg: Number(formData.get('quantityKg')),
      description: formData.get('description') || '',
      category: formData.get('category') || 'Other',
      location: formData.get('location') || ''
    }
    try {
      // attach base64 image if selected
      const imageFile = formData.get('image')
      if (imageFile && imageFile.size) {
        const buf = await imageFile.arrayBuffer()
        body.image = `data:${imageFile.type};base64,${btoa(String.fromCharCode(...new Uint8Array(buf)))}`
      }
      const res = await fetch(api('/api/listings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      })
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      if (!res.ok) throw new Error(data.message || 'Create failed')
      form.reset(); fetchMine()
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Products / Listings</h1>
        <a href="/seller" className="text-sm text-brand-700 hover:text-brand-800">Back to Dashboard</a>
      </div>
      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <input name="title" required placeholder="Crop name" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input name="pricePerKg" required type="number" min="0" placeholder="Price per kg (₹)" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input name="quantityKg" required type="number" min="0" placeholder="Quantity (kg)" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input name="location" placeholder="Location" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input name="category" placeholder="Category" className="rounded-lg border border-gray-300 px-3 py-2" />
        <textarea name="description" placeholder="Description" className="col-span-2 h-24 rounded-lg border border-gray-300 px-3 py-2" />
        <input name="image" type="file" accept="image/*" className="col-span-2 rounded-lg border border-gray-300 px-3 py-2" />
        {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="col-span-2 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50">{loading?'Saving...':'Add Product'}</button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((p) => (
          <div key={p._id} className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="font-semibold">{p.title}</p>
            <p className="text-sm text-gray-600">₹{p.pricePerKg}/kg • {p.quantityKg} kg</p>
            <p className="mt-2 text-xs text-gray-500">{p.location}</p>
          </div>
        ))}
        {items.length===0 && <p className="text-sm text-gray-500">No listings yet.</p>}
      </div>
    </div>
  )
}


