export default function SellerListings() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Products / Listings</h1>
        <a href="/seller" className="text-sm text-brand-700 hover:text-brand-800">Back to Dashboard</a>
      </div>
      <form className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <input placeholder="Crop name" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input placeholder="Price per kg (₹)" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input placeholder="Quantity (kg)" className="rounded-lg border border-gray-300 px-3 py-2" />
        <input type="file" multiple className="rounded-lg border border-gray-300 px-3 py-2" />
        <textarea placeholder="Description" className="col-span-2 h-24 rounded-lg border border-gray-300 px-3 py-2" />
        <button className="col-span-2 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Add Product</button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Wheat Grade-A","Potato Fresh","Tomato Organic"].map(p => (
          <div key={p} className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="font-semibold">{p}</p>
            <p className="text-sm text-gray-600">₹20/kg • 1000 kg</p>
            <div className="mt-3 flex gap-2 text-sm">
              <button className="rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50">Edit</button>
              <button className="rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


