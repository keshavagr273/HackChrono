import { useState } from 'react'
import { apiAuthPost } from '../../lib/api'

export default function SellerAI() {
  // Disease Detection state
  const [diseaseImage, setDiseaseImage] = useState(null)
  const [diseasePreview, setDiseasePreview] = useState(null)
  const [diseaseResult, setDiseaseResult] = useState(null)
  const [diseaseLoading, setDiseaseLoading] = useState(false)
  const [diseaseError, setDiseaseError] = useState(null)

  // Crop Recommendation state
  const [cropForm, setCropForm] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    ph: '',
    state: '',
    district: '',
    month: '',
  })
  const [cropResult, setCropResult] = useState(null)
  const [cropLoading, setCropLoading] = useState(false)
  const [cropError, setCropError] = useState(null)

  // Yield Prediction state
  const [yieldForm, setYieldForm] = useState({
    area: '',
    rainfall: '',
    fertilizer: '',
    crop: '',
    state: '',
  })
  const [yieldResult, setYieldResult] = useState(null)
  const [yieldLoading, setYieldLoading] = useState(false)
  const [yieldError, setYieldError] = useState(null)

  // Handle Disease Detection
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDiseaseImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setDiseasePreview(reader.result)
      }
      reader.readAsDataURL(file)
      setDiseaseError(null)
      setDiseaseResult(null)
    }
  }

  const handleDiseaseDetection = async () => {
    if (!diseaseImage) {
      setDiseaseError('Please upload an image first')
      return
    }

    setDiseaseLoading(true)
    setDiseaseError(null)
    setDiseaseResult(null)

    try {
      const response = await apiAuthPost('/api/ai/disease-detection', {
        image: diseasePreview
      })
      
      // Add 3-second delay before showing results
      setTimeout(() => {
        setDiseaseResult(response)
        setDiseaseLoading(false)
      }, 3000)
    } catch (error) {
      setTimeout(() => {
        setDiseaseError(error.message || 'Failed to detect disease')
        setDiseaseLoading(false)
      }, 3000)
    }
  }

  // Handle Crop Recommendation
  const handleCropRecommendation = async (e) => {
    e.preventDefault()
    setCropLoading(true)
    setCropError(null)
    setCropResult(null)

    try {
      const response = await apiAuthPost('/api/ai/crop-recommendation', cropForm)
      setCropResult(response)
    } catch (error) {
      setCropError(error.message || 'Failed to get crop recommendation')
    } finally {
      setCropLoading(false)
    }
  }

  // Handle Yield Prediction
  const handleYieldPrediction = async (e) => {
    e.preventDefault()
    setYieldLoading(true)
    setYieldError(null)
    setYieldResult(null)

    try {
      const response = await apiAuthPost('/api/ai/yield-prediction', yieldForm)
      
      // Add 3-second delay before showing results
      setTimeout(() => {
        setYieldResult(response)
        setYieldLoading(false)
      }, 3000)
    } catch (error) {
      setTimeout(() => {
        setYieldError(error.message || 'Failed to predict crop yield')
        setYieldLoading(false)
      }, 3000)
    }
  }

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
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Plant Leaf Image</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                </div>
              </div>

              {diseasePreview ? (
                <div className="rounded-2xl bg-gray-50 p-4 mb-4">
                  <img 
                    src={diseasePreview} 
                    alt="Preview" 
                    className="mx-auto max-h-64 rounded-lg object-contain"
                  />
                </div>
              ) : (
                <div className="rounded-2xl bg-gray-50 p-6 text-center mb-4">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Upload a clear image of the plant leaf</p>
                </div>
              )}

              <button 
                onClick={handleDiseaseDetection}
                disabled={!diseaseImage || diseaseLoading}
                className="w-full rounded-xl bg-red-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {diseaseLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>

              {diseaseError && (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">
                  {diseaseError}
                </div>
              )}

              {diseaseResult && (
                <div className="mt-4 rounded-xl bg-red-50 p-6 border-2 border-red-200">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Detection Result:</h3>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Plant Type</p>
                      <p className="text-xl font-bold text-gray-900">{diseaseResult.plant}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Detected Condition</p>
                      <p className={`text-2xl font-bold ${diseaseResult.disease.toLowerCase().includes('healthy') ? 'text-green-600' : 'text-red-600'}`}>
                        {diseaseResult.disease}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Confidence:</span>
                        <span className="text-lg font-semibold text-purple-600">{diseaseResult.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-red-200 pt-4">
                    <h4 className="font-bold text-gray-900 mb-2">💊 Treatment Recommendation:</h4>
                    <p className="text-gray-700 bg-white rounded-lg p-3">
                      {diseaseResult.treatment}
                    </p>
                  </div>

                  {diseaseResult.severity && (
                    <div className="mt-4 bg-white rounded-lg p-3">
                      <span className="text-sm font-semibold text-gray-700">Severity: </span>
                      <span className={`font-bold ${diseaseResult.color === 'green' ? 'text-green-600' : diseaseResult.color === 'red' ? 'text-red-600' : 'text-orange-600'}`}>
                        {diseaseResult.severity}
                      </span>
                    </div>
                  )}
                </div>
              )}
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
              
              <form onSubmit={handleCropRecommendation} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (ppm)</label>
                    <input 
                      type="number"
                      required
                      placeholder="90" 
                      value={cropForm.nitrogen}
                      onChange={(e) => setCropForm({ ...cropForm, nitrogen: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorous (ppm)</label>
                    <input 
                      type="number"
                      required
                      placeholder="42" 
                      value={cropForm.phosphorous}
                      onChange={(e) => setCropForm({ ...cropForm, phosphorous: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (ppm)</label>
                    <input 
                      type="number"
                      required
                      placeholder="43" 
                      value={cropForm.potassium}
                      onChange={(e) => setCropForm({ ...cropForm, potassium: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                    <input 
                      type="number"
                      step="0.1"
                      required
                      placeholder="6.5" 
                      value={cropForm.ph}
                      onChange={(e) => setCropForm({ ...cropForm, ph: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input 
                      type="text"
                      required
                      placeholder="Punjab" 
                      value={cropForm.state}
                      onChange={(e) => setCropForm({ ...cropForm, state: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ludhiana" 
                      value={cropForm.district}
                      onChange={(e) => setCropForm({ ...cropForm, district: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <select
                    required
                    value={cropForm.month}
                    onChange={(e) => setCropForm({ ...cropForm, month: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  >
                    <option value="">Select Month</option>
                    <option value="Jan-Feb">January-February</option>
                    <option value="Mar-May">March-May</option>
                    <option value="Jun-Sep">June-September</option>
                    <option value="Oct-Dec">October-December</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  disabled={cropLoading}
                  className="w-full rounded-xl bg-green-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {cropLoading ? 'Analyzing...' : 'Get Crop Suggestions'}
                </button>
              </form>

              {/* Crop Recommendation Result */}
              {cropError && (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">
                  {cropError}
                </div>
              )}
              {cropResult && (
                <div className="mt-4 rounded-xl bg-green-50 p-6 border-2 border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-2">Recommended Crop:</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">{cropResult.crop}</p>
                  <p className="text-gray-700">{cropResult.message}</p>
                </div>
              )}
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
              
              <form onSubmit={handleYieldPrediction} className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Area (acres)</label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    placeholder="5.0" 
                    value={yieldForm.area}
                    onChange={(e) => setYieldForm({ ...yieldForm, area: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Rainfall (mm)</label>
                  <input 
                    type="number"
                    required
                    placeholder="800" 
                    value={yieldForm.rainfall}
                    onChange={(e) => setYieldForm({ ...yieldForm, rainfall: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer (kg/acre)</label>
                  <input 
                    type="number"
                    required
                    placeholder="150" 
                    value={yieldForm.fertilizer}
                    onChange={(e) => setYieldForm({ ...yieldForm, fertilizer: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                  <input 
                    type="text"
                    required
                    placeholder="Rice" 
                    value={yieldForm.crop}
                    onChange={(e) => setYieldForm({ ...yieldForm, crop: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input 
                    type="text"
                    required
                    placeholder="Punjab" 
                    value={yieldForm.state}
                    onChange={(e) => setYieldForm({ ...yieldForm, state: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={handleYieldPrediction}
                  disabled={yieldLoading}
                  className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <span>{yieldLoading ? 'Predicting...' : 'Predict Yield'}</span>
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Yield Prediction Result */}
              {yieldError && (
                <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
                  {yieldError}
                </div>
              )}
              {yieldResult && (
                <div className="mt-6 rounded-xl bg-blue-50 p-6 border-2 border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Yield Category</p>
                      <p className={`text-2xl font-bold ${
                        yieldResult.yieldCategory === 'HIGH' ? 'text-green-600' : 
                        yieldResult.yieldCategory === 'MEDIUM' ? 'text-yellow-600' : 
                        'text-orange-600'
                      }`}>
                        {yieldResult.yieldCategory}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Estimated Yield</p>
                      <p className="text-2xl font-bold text-blue-600">{yieldResult.estimatedYield} tons</p>
                      {yieldResult.yieldPerAcre && (
                        <p className="text-xs text-gray-500 mt-1">({yieldResult.yieldPerAcre} tons/acre)</p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Confidence</p>
                      <p className="text-2xl font-bold text-purple-600">{yieldResult.confidence}%</p>
                    </div>
                  </div>
                  
                  {(yieldResult.cropMatched || yieldResult.stateMatched) && (
                    <div className="mb-4 p-3 bg-white rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Prediction for:</span>{' '}
                        {yieldResult.cropMatched || 'crop'} in {yieldResult.stateMatched || 'region'}
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t border-blue-200 pt-4">
                    <h4 className="font-bold text-gray-900 mb-2">
                      {yieldResult.recommendations && yieldResult.recommendations.length > 0 ? '💡 ' : ''}
                      Recommendations:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      {yieldResult.recommendations && yieldResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {yieldResult.note && (
                    <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                      ℹ️ {yieldResult.note}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
