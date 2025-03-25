"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time - you can adjust this or tie it to actual resource loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md"></div>
      <div className="relative">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            {/* Animated circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full animate-bounce"></div>
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-primary animate-pulse">Loading...</h2>
        </div>
      </div>
    </div>
  )
}

