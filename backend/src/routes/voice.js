import express from 'express'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

// Intent recognition using pattern matching
function recognizeIntent(text, currentRoute, language = 'en-US') {
  const lowerText = text.toLowerCase().trim()
  
  // Debug logging
  console.log('Recognizing intent for text:', text)
  console.log('Language:', language)
  console.log('Lower text:', lowerText)
  
  // Navigation intents - English and Hindi
  // Use simpler patterns without word boundaries for Hindi
  const navigationPatterns = {
    market: language === 'hi-IN' 
      ? /(जाओ|खोलो|दिखाओ|ले चलो)?\s*(मार्केट|बाज़ार|मंडी|दुकान|खरीदारी|market)/i
      : /\b(go to|open|show|navigate to|take me to)?\s*(market|marketplace|shop|store|buy|products|browse)\b/i,
    
    orders: language === 'hi-IN'
      ? /(दिखाओ|देखो|चेक|करो|मेरे|मेरा)?\s*(ऑर्डर|आदेश|खरीदी|order)/i
      : /\b(show|view|check|see|open|my)?\s*(orders|purchases|bought|order history)\b/i,
    
    cart: language === 'hi-IN'
      ? /(दिखाओ|देखो|चेक|करो|खोलो|मेरी|मेरा)?\s*(कार्ट|टोकरी|cart)/i
      : /\b(show|view|check|see|open|my)?\s*(cart|shopping cart|basket)\b/i,
    
    checkout: language === 'hi-IN'
      ? /(जाओ|खोलो|आगे|बढ़ो)?\s*(चेकआउट|भुगतान|पेमेंट|checkout)/i
      : /\b(go to|open|proceed to)?\s*(checkout|payment|pay)\b/i,
    
    dashboard: language === 'hi-IN'
      ? /(जाओ|खोलो|दिखाओ)?\s*(डैशबोर्ड|डैशबोर्ड पर|सेलर|होम|dashboard)/i
      : /\b(go to|open|show|navigate to|take me to)?\s*(dashboard|seller dashboard|seller home|seller page)\b/i,
    
    listings: language === 'hi-IN'
      ? /(दिखाओ|देखो|मेरी|मैनेज|करो)?\s*(लिस्टिंग|उत्पाद|सामान|listing)/i
      : /\b(show|view|my|manage)?\s*(listings|products|items for sale|selling|what i'm selling)\b/i,
    
    ai: language === 'hi-IN'
      ? /(खोलो|दिखाओ|जाओ)?\s*(एआई|ai|आर्टिफिशियल|फसल|सलाहकार|advisor)/i
      : /\b(open|show|go to|navigate to)?\s*(ai|artificial intelligence|ai tools|crop advisor|crop recommendation|yield prediction|ai advisor)\b/i,
    
    analytics: language === 'hi-IN'
      ? /(दिखाओ|देखो|चेक|करो|खोलो)?\s*(एनालिटिक्स|आंकड़े|स्टैटिस्टिक्स|analytics)/i
      : /\b(show|view|check|open)?\s*(analytics|statistics|stats|reports|analysis|insights)\b/i,
    
    home: language === 'hi-IN'
      ? /(जाओ|ले|चलो|दिखाओ)?\s*(होम|घर|home)/i
      : /\b(go to|take me to|navigate to|show)?\s*(home|home page|landing page|main page|start)\b/i,
    
    login: language === 'hi-IN'
      ? /(जाओ|खोलो|दिखाओ)?\s*(लॉगिन|login)/i
      : /\b(go to|open|show)?\s*(login|log in|sign in)\b/i,
    
    signup: language === 'hi-IN'
      ? /(जाओ|खोलो|दिखाओ)?\s*(साइनअप|रजिस्टर|signup)/i
      : /\b(go to|open|show)?\s*(signup|sign up|register|create account)\b/i,
  }

  // Check navigation intents
  for (const [intent, pattern] of Object.entries(navigationPatterns)) {
    console.log(`Testing pattern for ${intent}:`, pattern)
    if (pattern.test(lowerText)) {
      console.log(`✓ Matched intent: ${intent}`)
      return handleNavigationIntent(intent, currentRoute, language)
    }
  }
  
  console.log('✗ No navigation pattern matched')

  // Action intents
  // Additional action intents
  const createListingPattern = language === 'hi-IN'
    ? /(जोड़ो|बनाओ|नया|लिस्ट|करो)?\s*(प्रोडक्ट|सामान|लिस्टिंग|product|listing)/i
    : /\b(add|create|new|list)\s+(product|item|listing)\b/i
  
  if (createListingPattern.test(lowerText)) {
    console.log('✓ Matched create listing')
    return {
      intent: 'create_listing',
      action: 'navigate',
      route: '/seller/listings',
      message: language === 'hi-IN'
        ? 'लिस्टिंग पेज खोल रहे हैं जहां आप नया प्रोडक्ट जोड़ सकते हैं।'
        : 'Opening listings page where you can add a new product.'
    }
  }
  
  const goBackPattern = language === 'hi-IN'
    ? /(वापस|पीछे|back)/i
    : /\b(go back|back|previous page)\b/i
  
  if (goBackPattern.test(lowerText)) {
    console.log('✓ Matched go back')
    return {
      intent: 'go_back',
      action: 'history_back',
      message: language === 'hi-IN'
        ? 'पिछले पेज पर जा रहे हैं।'
        : 'Going back to the previous page.'
    }
  }

  if (/\b(search|find|look for)\s+(.+)/i.test(lowerText)) {
    const match = lowerText.match(/\b(search|find|look for)\s+(.+)/i)
    return {
      intent: 'search',
      action: 'search',
      query: match[2],
      message: `Searching for ${match[2]}...`
    }
  }

  const helpPattern = language === 'hi-IN'
    ? /(मदद|सहायता|help)/i
    : /\b(help|assist|support|what can you do)\b/i
  
  if (helpPattern.test(lowerText)) {
    console.log('✓ Matched help')
    return {
      intent: 'help',
      action: 'info',
      message: language === 'hi-IN'
        ? 'मैं आपको नेविगेट करने में मदद कर सकता हूं। कहने की कोशिश करें: मार्केट खोलो, मेरे ऑर्डर दिखाओ, एआई सलाहकार खोलो, डैशबोर्ड पर जाओ।'
        : 'I can help you navigate. Try saying: go to market, show my orders, open AI advisor, go to dashboard, or show my listings.'
    }
  }

  // Default - don't understand
  console.log('✗ No pattern matched at all')
  console.log('Received text:', JSON.stringify(text))
  return {
    intent: 'unknown',
    action: 'none',
    message: language === 'hi-IN'
      ? `मुझे समझ नहीं आया। आपने कहा: "${text}". कहने की कोशिश करें: मार्केट खोलो, मेरे ऑर्डर दिखाओ, या एआई सलाहकार खोलो।`
      : `I didn't quite understand that. You said: "${text}". Try saying 'go to market', 'show my orders', or 'open AI advisor'.`
  }
}

function handleNavigationIntent(intent, currentRoute, language = 'en-US') {
  // Messages in both languages
  const messages = {
    'en-US': {
      market: 'Taking you to the marketplace.',
      orders: 'Opening your orders.',
      cart: 'Opening your shopping cart.',
      checkout: 'Taking you to checkout.',
      dashboard: 'Going to the seller dashboard.',
      listings: 'Opening your product listings.',
      ai: 'Opening the AI Crop Advisor.',
      analytics: 'Opening analytics page.',
      home: 'Taking you to the home page.',
      login: 'Opening login page.',
      signup: 'Opening signup page.',
      alreadyHere: "You're already on this page."
    },
    'hi-IN': {
      market: 'मार्केटप्लेस पर ले जा रहे हैं।',
      orders: 'आपके ऑर्डर खोल रहे हैं।',
      cart: 'आपकी शॉपिंग कार्ट खोल रहे हैं।',
      checkout: 'चेकआउट पर ले जा रहे हैं।',
      dashboard: 'सेलर डैशबोर्ड पर जा रहे हैं।',
      listings: 'आपकी प्रोडक्ट लिस्टिंग खोल रहे हैं।',
      ai: 'एआई फसल सलाहकार खोल रहे हैं।',
      analytics: 'एनालिटिक्स पेज खोल रहे हैं।',
      home: 'होम पेज पर ले जा रहे हैं।',
      login: 'लॉगिन पेज खोल रहे हैं।',
      signup: 'साइनअप पेज खोल रहे हैं।',
      alreadyHere: 'आप पहले से ही इस पेज पर हैं।'
    }
  }

  const routes = {
    market: '/buyer/market',
    orders: currentRoute.includes('/seller') ? '/seller/orders' : '/buyer/orders',
    cart: '/buyer/cart',
    checkout: '/buyer/checkout',
    dashboard: '/seller',
    listings: '/seller/listings',
    ai: '/seller/ai',
    analytics: '/seller/analytics',
    home: '/',
    login: '/login',
    signup: '/signup'
  }

  const route = routes[intent]
  const langMessages = messages[language] || messages['en-US']

  if (!route) {
    return {
      intent: 'unknown',
      action: 'none',
      message: language === 'hi-IN' 
        ? 'मुझे समझ नहीं आया आप कहाँ जाना चाहते हैं।'
        : "I'm not sure where you want to go."
    }
  }

  // Check if already on the page
  if (currentRoute === route) {
    return {
      intent,
      action: 'none',
      message: langMessages.alreadyHere
    }
  }

  return {
    intent,
    action: 'navigate',
    route: route,
    message: langMessages[intent]
  }
}

// Enhanced intent recognition with AI (optional - requires OpenAI API)
async function recognizeIntentWithAI(text, currentRoute, language = 'en-US') {
  // If you have OpenAI API key, you can use GPT for better intent recognition
  const openaiKey = process.env.OPENAI_API_KEY
  
  if (!openaiKey) {
    // Fallback to pattern matching
    return recognizeIntent(text, currentRoute, language)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a voice assistant for an agricultural e-commerce platform. 
Available routes: /market (marketplace), /orders (user orders), /cart (shopping cart), 
/seller/dashboard (seller main page), /seller/listings (manage products), /seller/ai (AI crop advisor), 
/seller/analytics (analytics), /profile (user profile).

Extract the intent and route from user speech. Respond in JSON format:
{
  "intent": "navigation|search|help|create|unknown",
  "action": "navigate|search|info|none",
  "route": "/path or null",
  "message": "friendly response to user"
}`
          },
          {
            role: 'user',
            content: `User said: "${text}". Current route: ${currentRoute}`
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    })

    if (response.ok) {
      const data = await response.json()
      const result = JSON.parse(data.choices[0].message.content)
      return result
    }
  } catch (error) {
    console.error('AI intent recognition error:', error)
  }

  // Fallback to pattern matching
  return recognizeIntent(text, currentRoute, language)
}

// Intent recognition endpoint
router.post('/intent', requireAuth, async (req, res) => {
  try {
    const { text, currentRoute, language } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Text is required' })
    }

    // Use AI if available, otherwise pattern matching
    const result = await recognizeIntentWithAI(text, currentRoute || '/', language || 'en-US')

    res.json(result)
  } catch (error) {
    console.error('Intent recognition error:', error)
    const lang = req.body.language || 'en-US'
    res.status(500).json({ 
      error: 'Failed to recognize intent',
      intent: 'error',
      action: 'none',
      message: lang === 'hi-IN'
        ? 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
        : 'Sorry, something went wrong. Please try again.'
    })
  }
})

// Test endpoint to check what text is received
router.post('/test', requireAuth, (req, res) => {
  const { text, language } = req.body
  console.log('=== TEST ENDPOINT ===')
  console.log('Received text:', text)
  console.log('Language:', language)
  console.log('Text type:', typeof text)
  console.log('Text length:', text?.length)
  console.log('Text bytes:', Buffer.from(text || '', 'utf8'))
  
  res.json({
    received: text,
    language: language,
    length: text?.length,
    type: typeof text
  })
})

// Get available commands
router.get('/commands', requireAuth, (req, res) => {
  res.json({
    commands: [
      { phrase: 'Go to market', description: 'Navigate to marketplace' },
      { phrase: 'Show my orders', description: 'View order history' },
      { phrase: 'Open cart', description: 'View shopping cart' },
      { phrase: 'Go to checkout', description: 'Proceed to checkout' },
      { phrase: 'Navigate to dashboard', description: 'Go to seller dashboard' },
      { phrase: 'Show my listings', description: 'View your products' },
      { phrase: 'Open AI advisor', description: 'Open AI Crop Advisor' },
      { phrase: 'Show analytics', description: 'View analytics' },
      { phrase: 'Go home', description: 'Go to home page' },
      { phrase: 'Go back', description: 'Go to previous page' },
      { phrase: 'Help', description: 'Get help with commands' }
    ]
  })
})

export default router

