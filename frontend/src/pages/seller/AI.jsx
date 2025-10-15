export default function SellerAI() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">AI Crop Advisor</h1>
          <p className="mt-4 text-xl text-gray-600">Smart farming tools powered by artificial intelligence</p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Pest & Disease Detection */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 shadow-lg">
                  <span className="text-3xl">🔍</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Pest & Disease Detection</h2>
                  <p className="text-gray-600">Upload plant images for instant diagnosis</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Plant Image</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600">Upload an image to get AI-powered pest and disease analysis</p>
              </div>

              <button className="mt-6 w-full rounded-xl bg-red-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300 hover:scale-105">
                Analyze Image
              </button>
            </div>
          </div>

          {/* Crop Recommendation */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 shadow-lg">
                  <span className="text-3xl">🌱</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Crop Recommendation</h2>
                  <p className="text-gray-600">Get personalized crop suggestions</p>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                    <input 
                      placeholder="6.5" 
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (ppm)</label>
                    <input 
                      placeholder="120" 
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (ppm)</label>
                    <input 
                      placeholder="45" 
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (ppm)</label>
                    <input 
                      placeholder="180" 
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    placeholder="Punjab, India" 
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </div>
                
                <button className="w-full rounded-xl bg-green-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300 hover:scale-105">
                  Get Crop Suggestions
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Yield Prediction */}
        <div className="mt-8">
          <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="mb-6 flex items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 shadow-lg">
                  <span className="text-3xl">📊</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Yield Prediction</h2>
                  <p className="text-gray-600">Forecast your harvest quantity</p>
                </div>
              </div>
              
              <form className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Area (acres)</label>
                  <input 
                    placeholder="5.0" 
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Rainfall (mm)</label>
                  <input 
                    placeholder="800" 
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer (kg/acre)</label>
                  <input 
                    placeholder="150" 
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <button className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                  <span>Predict Yield</span>
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


