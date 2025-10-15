import React from 'react'

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Circular Logo with Plant and Circuit Design */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center rounded-full bg-gradient-to-br from-lime-400 via-green-500 to-blue-600 shadow-lg`}>
        {/* Wi-Fi Symbol */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        
        {/* Plant/Sprout Design */}
        <div className="relative">
          {/* Left Leaf */}
          <div className="absolute -left-2 top-0 w-3 h-4 bg-gradient-to-br from-green-300 to-green-600 rounded-full transform -rotate-45"></div>
          {/* Right Leaf */}
          <div className="absolute -right-2 top-0 w-3 h-4 bg-gradient-to-br from-green-300 to-green-600 rounded-full transform rotate-45"></div>
          {/* Stem */}
          <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-700"></div>
        </div>
        
        {/* Circuit Board Roots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Soil/Ground Base */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-t from-blue-800 to-blue-600 rounded-full"></div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-gray-900`}>DigiKhet</span>
          <span className="text-xs text-gray-600 hidden sm:block">Smart Kheti Ke Sathi</span>
        </div>
      )}
    </div>
  )
}
