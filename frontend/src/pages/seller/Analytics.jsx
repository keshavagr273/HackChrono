import { useEffect, useState } from 'react'
import { apiAuthGet } from '../../lib/api'

export default function SellerAnalytics() {
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalPredictions: 0,
    cropRecommendations: 0,
    yieldPredictions: 0,
    diseaseDetections: 0,
    avgConfidence: 0,
    recentActivity: []
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await apiAuthGet('/api/ai/results?limit=50')
        if (!cancelled) {
          setResults(data.results || [])
          calculateStats(data.results || [])
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load AI results')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  function calculateStats(results) {
    const stats = {
      totalPredictions: results.length,
      cropRecommendations: results.filter(r => r.type === 'CROP_RECOMMENDATION').length,
      yieldPredictions: results.filter(r => r.type === 'YIELD_PREDICTION').length,
      diseaseDetections: results.filter(r => r.type === 'DISEASE_DETECTION').length,
      avgConfidence: 0,
      recentActivity: results.slice(0, 5)
    }

    // Calculate average confidence for yield predictions
    const yieldResults = results.filter(r => r.type === 'YIELD_PREDICTION' && r.result?.confidence)
    if (yieldResults.length > 0) {
      stats.avgConfidence = yieldResults.reduce((sum, r) => sum + parseFloat(r.result.confidence), 0) / yieldResults.length
    }

    setStats(stats)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Farm Analytics Dashboard</h1>
        <a href="/seller" className="text-sm text-brand-700 hover:text-brand-800">Back to Dashboard</a>
      </div>
      <p className="mt-2 text-gray-600">Real-time insights from your AI predictions and recommendations.</p>

      {loading ? (
        <div className="mt-8 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-brand-600"></div>
            <p className="mt-4 text-gray-500">Loading analytics...</p>
          </div>
        </div>
      ) : error ? (
        <div className="mt-8 rounded-lg bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-lg bg-blue-50 p-6 text-center">
          <p className="text-blue-600">No AI predictions yet. Run crop recommendations, yield predictions, or disease detection to see analytics.</p>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <div className="rounded-lg bg-blue-100 p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Predictions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPredictions}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <div className="rounded-lg bg-green-100 p-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Crop Recommendations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.cropRecommendations}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <div className="rounded-lg bg-yellow-100 p-3">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Yield Predictions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.yieldPredictions}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <div className="rounded-lg bg-red-100 p-3">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Disease Detections</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.diseaseDetections}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Prediction Types Chart */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Prediction Types Distribution</h2>
              <div className="h-64 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  {stats.totalPredictions > 0 && (
                    <>
                      <circle 
                        cx="100" cy="100" r="80" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="20"
                        strokeDasharray={`${(stats.cropRecommendations / stats.totalPredictions) * 502.4} 502.4`}
                        strokeDashoffset="0"
                        transform="rotate(-90 100 100)"
                      />
                      <circle 
                        cx="100" cy="100" r="80" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="20"
                        strokeDasharray={`${(stats.yieldPredictions / stats.totalPredictions) * 502.4} 502.4`}
                        strokeDashoffset={`-${(stats.cropRecommendations / stats.totalPredictions) * 502.4}`}
                        transform="rotate(-90 100 100)"
                      />
                      <circle 
                        cx="100" cy="100" r="80" 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="20"
                        strokeDasharray={`${(stats.diseaseDetections / stats.totalPredictions) * 502.4} 502.4`}
                        strokeDashoffset={`-${((stats.cropRecommendations + stats.yieldPredictions) / stats.totalPredictions) * 502.4}`}
                        transform="rotate(-90 100 100)"
                      />
                    </>
                  )}
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="text-sm font-medium fill-gray-600">
                    {stats.totalPredictions} Total
                  </text>
                </svg>
              </div>
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Crop ({stats.cropRecommendations})</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Yield ({stats.yieldPredictions})</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Disease ({stats.diseaseDetections})</span>
                </div>
              </div>
            </section>

            {/* Yield Confidence Chart */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Average Yield Confidence</h2>
              <div className="h-64 flex items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 200 200" className="h-48 w-48">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle 
                      cx="100" cy="100" r="80" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="16"
                      strokeDasharray={`${(stats.avgConfidence / 100) * 502.4} 502.4`}
                      strokeDashoffset="125.6"
                      transform="rotate(-90 100 100)"
                      className="transition-all duration-1000"
                    />
                    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-900">
                      {stats.avgConfidence.toFixed(1)}%
                    </text>
                    <text x="100" y="120" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-600">
                      Confidence
                    </text>
                  </svg>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Based on {stats.yieldPredictions} yield predictions
              </p>
            </section>
          </div>

          {/* Recent Activity Timeline */}
          <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent AI Activity</h2>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={activity._id} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                    activity.type === 'CROP_RECOMMENDATION' ? 'bg-blue-500' :
                    activity.type === 'YIELD_PREDICTION' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {activity.type === 'CROP_RECOMMENDATION' && (
                        <span>Recommended: <strong>{activity.result?.crop}</strong></span>
                      )}
                      {activity.type === 'YIELD_PREDICTION' && (
                        <span>Predicted: <strong>{activity.result?.yieldCategory}</strong> yield ({activity.result?.confidence}% confidence)</span>
                      )}
                      {activity.type === 'DISEASE_DETECTION' && (
                        <span>Detected: <strong>{activity.result?.disease}</strong> ({activity.result?.confidence}% confidence)</span>
                      )}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </section>

          {/* Detailed Results */}
          <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Detailed AI Results</h2>
            <div className="space-y-4">
              {results.map((r) => (
                <div key={r._id} className="rounded-lg border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        r.type === 'CROP_RECOMMENDATION' ? 'bg-blue-100 text-blue-800' :
                        r.type === 'YIELD_PREDICTION' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {r.type.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Input Parameters</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(r.input).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
      </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">AI Result</h4>
                      <div className="space-y-1 text-sm">
                        {r.type === 'CROP_RECOMMENDATION' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Recommended Crop:</span>
                              <span className="font-medium text-green-600">{r.result?.crop}</span>
                            </div>
                            <div className="text-gray-600 text-xs mt-2">{r.result?.message}</div>
                          </>
                        )}
                        {r.type === 'YIELD_PREDICTION' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Yield Category:</span>
                              <span className={`font-medium ${
                                r.result?.yieldCategory === 'HIGH' ? 'text-green-600' :
                                r.result?.yieldCategory === 'MEDIUM' ? 'text-yellow-600' : 'text-red-600'
                              }`}>{r.result?.yieldCategory}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Estimated Yield:</span>
                              <span className="font-medium">{r.result?.estimatedYield} tons</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Confidence:</span>
                              <span className="font-medium">{r.result?.confidence}%</span>
                            </div>
                          </>
                        )}
                        {r.type === 'DISEASE_DETECTION' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Plant:</span>
                              <span className="font-medium">{r.result?.plant}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Disease:</span>
                              <span className={`font-medium ${
                                r.result?.disease?.toLowerCase().includes('healthy') ? 'text-green-600' : 'text-red-600'
                              }`}>{r.result?.disease}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Confidence:</span>
                              <span className="font-medium">{r.result?.confidence}%</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
          </div>
                </div>
              ))}
        </div>
      </section>
        </>
      )}
    </div>
  )
}


