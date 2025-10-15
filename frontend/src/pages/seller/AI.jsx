export default function SellerAI() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">AI Crop Advisor</h1>
      <p className="mt-2 text-gray-600">Prototype tools to support diagnosis, recommendation and prediction.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Pest & Disease Detection</h2>
          <p className="mt-1 text-sm text-gray-600">Upload a plant image for instant hints.</p>
          <input type="file" accept="image/*" className="mt-3 block w-full rounded-lg border border-gray-300 p-2" />
          <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">Results will appear here.</div>
        </section>

        <section className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Crop Recommendation</h2>
          <form className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <input placeholder="Soil pH" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="N (ppm)" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="P (ppm)" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="K (ppm)" className="rounded-lg border border-gray-300 px-3 py-2" />
            <input placeholder="Location" className="col-span-2 rounded-lg border border-gray-300 px-3 py-2" />
            <button className="col-span-2 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Get Suggestions</button>
          </form>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Yield Prediction</h2>
        <form className="mt-3 grid grid-cols-3 gap-3 text-sm">
          <input placeholder="Area (acre)" className="rounded-lg border border-gray-300 px-3 py-2" />
          <input placeholder="Rain (mm)" className="rounded-lg border border-gray-300 px-3 py-2" />
          <input placeholder="Fertilizer (kg/acre)" className="rounded-lg border border-gray-300 px-3 py-2" />
          <button className="col-span-3 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">Predict</button>
        </form>
      </section>
    </div>
  )
}


