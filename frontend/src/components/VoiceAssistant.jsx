import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiAuthPost } from '../lib/api'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState('en-US') // Default to English
  
  const navigate = useNavigate()
  const location = useLocation()
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  // Language options
  const languages = {
    'en-US': { name: 'English', flag: '🇺🇸' },
    'hi-IN': { name: 'हिंदी', flag: '🇮🇳' }
  }

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = language // Use selected language

      recognitionRef.current.onresult = (event) => {
        const speechToText = event.results[0][0].transcript
        setTranscript(speechToText)
        handleSpeechCommand(speechToText)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error, event)
        
        // Provide specific error messages
        let errorMessage = ''
        switch (event.error) {
          case 'not-allowed':
          case 'permission-denied':
            errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings.'
            break
          case 'no-speech':
            errorMessage = "I didn't hear anything. Please try speaking again."
            break
          case 'audio-capture':
            errorMessage = 'No microphone found. Please check your microphone connection.'
            break
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.'
            break
          case 'aborted':
            errorMessage = 'Speech recognition was stopped.'
            break
          default:
            errorMessage = `Error: ${event.error}. Please try again.`
        }
        
        setError(errorMessage)
        setIsListening(false)
        
        // Only speak if it's not a permission error (to avoid annoyance)
        if (event.error !== 'not-allowed' && event.error !== 'permission-denied') {
          speak(errorMessage)
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    }
  }, [language]) // Reinitialize when language changes

  // Start listening
  const startListening = () => {
    setError(null)
    setTranscript('')
    setResponse('')
    
    if (recognitionRef.current) {
      try {
        setIsListening(true)
        recognitionRef.current.start()
        console.log('Speech recognition started')
      } catch (error) {
        console.error('Error starting recognition:', error)
        setIsListening(false)
        
        if (error.name === 'InvalidStateError') {
          setError('Speech recognition is already running. Please wait.')
        } else {
          setError('Failed to start speech recognition. Please refresh the page and try again.')
        }
      }
    } else {
      setError('Speech recognition is not initialized. Please refresh the page.')
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        console.log('Speech recognition stopped')
      } catch (error) {
        console.error('Error stopping recognition:', error)
      }
    }
    setIsListening(false)
  }

  // Text to speech
  const speak = (text) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      utterance.lang = language // Set language for TTS
      synthRef.current.speak(utterance)
    }
  }

  // Change language
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    setTranscript('')
    setResponse('')
    setError(null)
  }

  // Handle speech command
  const handleSpeechCommand = async (speechText) => {
    setIsProcessing(true)
    
    try {
      // Send to backend for intent recognition
      const result = await apiAuthPost('/api/voice/intent', {
        text: speechText,
        currentRoute: location.pathname,
        language: language
      })

      const { intent, action, message, route, data } = result

      setResponse(message)
      speak(message)

      // Execute action based on intent
      if (action === 'navigate' && route) {
        setTimeout(() => {
          navigate(route)
        }, 1500) // Give time for speech to complete
      } else if (action === 'history_back') {
        setTimeout(() => {
          navigate(-1) // Go back in history
        }, 1500)
      } else if (action === 'fill_form' && data) {
        // Trigger form filling (can be enhanced)
        console.log('Fill form with:', data)
      }
    } catch (error) {
      console.error('Intent recognition error:', error)
      const errorMsg = 'Sorry, I could not understand that. Please try again.'
      setResponse(errorMsg)
      speak(errorMsg)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        title="Open Voice Assistant"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl bg-white shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${isListening ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`}></div>
            <h3 className="text-white font-semibold">Voice Assistant</h3>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          {Object.entries(languages).map(([code, info]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                language === code
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span>{info.flag}</span>
              <span>{info.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {/* Instructions */}
        {!transcript && !response && (
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              {language === 'hi-IN' ? '👋 नमस्ते! मैं आपकी मदद कर सकता हूं।' : '👋 Hi! I can help you navigate.'}
            </p>
            <p className="text-xs">
              {language === 'hi-IN' ? 'कहने की कोशिश करें:' : 'Try saying:'}
            </p>
            <ul className="mt-2 space-y-1 text-xs text-left">
              {language === 'hi-IN' ? (
                <>
                  <li>• "मार्केट खोलो"</li>
                  <li>• "मेरे ऑर्डर दिखाओ"</li>
                  <li>• "एआई सलाहकार खोलो"</li>
                  <li>• "डैशबोर्ड पर जाओ"</li>
                  <li>• "मेरी लिस्टिंग दिखाओ"</li>
                  <li>• "पीछे जाओ"</li>
                </>
              ) : (
                <>
                  <li>• "Go to market"</li>
                  <li>• "Show my orders"</li>
                  <li>• "Open AI advisor"</li>
                  <li>• "Go to dashboard"</li>
                  <li>• "Show my listings"</li>
                  <li>• "Go back"</li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-semibold mb-1">You said:</p>
            <p className="text-gray-800">{transcript}</p>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-xs text-purple-600 font-semibold mb-1">Assistant:</p>
            <p className="text-gray-800">{response}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            <span className="text-sm">Processing...</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        {isListening ? (
          <button
            onClick={stopListening}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            <div className="h-3 w-3 rounded-full bg-white animate-pulse"></div>
            <span className="font-semibold">Listening... (Click to stop)</span>
          </button>
        ) : (
          <button
            onClick={startListening}
            disabled={isProcessing}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="font-semibold">Press to Speak</span>
          </button>
        )}
        
        <p className="text-xs text-gray-500 text-center mt-2">
          {language === 'hi-IN' 
            ? 'बटन दबाएं और अपना आदेश बोलें'
            : 'Click the button and speak your command'}
        </p>
      </div>
    </div>
  )
}

