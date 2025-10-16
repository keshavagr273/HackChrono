import express from 'express'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

// Crop Recommendation endpoint
router.post('/crop-recommendation', requireAuth, async (req, res) => {
  try {
    const { nitrogen, phosphorous, potassium, ph, state, district, month } = req.body

    // Validate inputs
    if (!nitrogen || !phosphorous || !potassium || !ph || !state || !district || !month) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Call the Python FastAPI service
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000'
    
    const response = await fetch(`${pythonApiUrl}/predict/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nitrogen: parseFloat(nitrogen),
        phosphorous: parseFloat(phosphorous),
        potassium: parseFloat(potassium),
        ph: parseFloat(ph),
        state,
        district,
        month,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json({ 
        error: errorData.detail || 'Failed to get crop recommendation' 
      })
    }

    const data = await response.json()
    res.json({ 
      success: true,
      crop: data.result,
      message: `Based on your soil conditions and location, we recommend growing ${data.result}` 
    })
  } catch (error) {
    console.error('Crop recommendation error:', error)
    res.status(500).json({ 
      error: 'Failed to get crop recommendation. Please ensure the ML service is running.' 
    })
  }
})

// Yield Prediction endpoint (ML-based)
router.post('/yield-prediction', requireAuth, async (req, res) => {
  try {
    const { area, rainfall, fertilizer, crop, state } = req.body

    // Validate inputs
    if (!area || !rainfall || !fertilizer || !crop || !state) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Call the Python ML service
    const yieldApiUrl = process.env.YIELD_API_URL || 'http://localhost:8001'
    
    try {
      const response = await fetch(`${yieldApiUrl}/predict-yield/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area: parseFloat(area),
          rainfall: parseFloat(rainfall),
          fertilizer: parseFloat(fertilizer),
          crop,
          state,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return res.status(response.status).json({ 
          error: errorData.detail || 'Failed to predict crop yield' 
        })
      }

      const data = await response.json()
      res.json(data)
    } catch (fetchError) {
      console.error('ML service not available, using fallback:', fetchError.message)
      
      // Fallback to heuristic if ML service is down
      const score = calculateYieldScore(
        parseFloat(area),
        parseFloat(rainfall),
        parseFloat(fertilizer)
      )

      const prediction = {
        success: true,
        yieldCategory: score > 50 ? 'HIGH' : 'LOW',
        estimatedYield: (parseFloat(area) * score * 0.8).toFixed(2),
        confidence: (score > 50 ? score : 100 - score).toFixed(1),
        recommendations: generateRecommendations(score, rainfall, fertilizer),
        note: 'Using fallback prediction (ML service unavailable)'
      }

      res.json(prediction)
    }
  } catch (error) {
    console.error('Yield prediction error:', error)
    res.status(500).json({ error: 'Failed to predict crop yield' })
  }
})

// Helper function to calculate yield score
function calculateYieldScore(area, rainfall, fertilizer) {
  // Normalized scoring based on optimal conditions
  let score = 50 // Base score

  // Rainfall impact (optimal range: 600-1200mm)
  if (rainfall >= 600 && rainfall <= 1200) {
    score += 20
  } else if (rainfall < 600) {
    score += (rainfall / 600) * 20
  } else {
    score += 20 - ((rainfall - 1200) / 100)
  }

  // Fertilizer impact (optimal: 100-200 kg/acre)
  if (fertilizer >= 100 && fertilizer <= 200) {
    score += 20
  } else if (fertilizer < 100) {
    score += (fertilizer / 100) * 20
  } else {
    score += 20 - ((fertilizer - 200) / 50)
  }

  // Area impact (larger areas may have economies of scale)
  score += Math.min(10, area * 0.5)

  return Math.max(0, Math.min(100, score))
}

// Helper function to generate recommendations
function generateRecommendations(score, rainfall, fertilizer) {
  const recommendations = []

  if (rainfall < 600) {
    recommendations.push('Consider irrigation systems - rainfall is below optimal')
  } else if (rainfall > 1200) {
    recommendations.push('Ensure proper drainage - rainfall is high')
  }

  if (fertilizer < 100) {
    recommendations.push('Increase fertilizer application for better yield')
  } else if (fertilizer > 200) {
    recommendations.push('Reduce fertilizer to avoid soil degradation')
  }

  if (score < 50) {
    recommendations.push('Consider soil testing and crop rotation')
  }

  if (recommendations.length === 0) {
    recommendations.push('Your conditions are optimal! Maintain current practices')
  }

  return recommendations
}

// Plant Disease Detection endpoint
router.post('/disease-detection', requireAuth, async (req, res) => {
  try {
    const { image } = req.body

    if (!image) {
      return res.status(400).json({ error: 'Image is required' })
    }

    // Call the Python Disease Detection service
    const diseaseApiUrl = process.env.DISEASE_API_URL || 'http://localhost:8002'
    
    try {
      // Send base64 image directly to Python service
      const response = await fetch(`${diseaseApiUrl}/detect-base64/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return res.status(response.status).json({ 
          error: errorData.detail || 'Failed to detect disease' 
        })
      }

      const data = await response.json()
      res.json(data)
    } catch (fetchError) {
      console.error('Disease detection service not available:', fetchError.message)
      
      // Fallback response
      res.status(503).json({ 
        error: 'Disease detection service is not available. Please ensure the ML service is running on port 8002.',
        note: 'Start the service with: python start_disease_server.py'
      })
    }
  } catch (error) {
    console.error('Disease detection error:', error)
    res.status(500).json({ error: 'Failed to process disease detection request' })
  }
})

export default router

