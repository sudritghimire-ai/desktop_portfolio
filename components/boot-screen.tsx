"use client"

import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"

const BootScreen = () => {
  const [bootText, setBootText] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const bootSequence = [
    "Initializing PortfolioOS...",
    "Loading system components...",
    "Starting window manager...",
    "Mounting desktop environment...",
    "Loading applications...",
    "System ready!",
  ]

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootText((prev) => [...prev, bootSequence[currentIndex]])
        setCurrentIndex((prev) => prev + 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex])

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-green-400 font-mono">
      <div className="mb-8">
        <Terminal className="w-16 h-16 animate-pulse" />
      </div>
      <div className="text-2xl font-bold mb-8">PortfolioOS</div>
      <div className="space-y-2 text-center">
        {bootText.map((text, index) => (
          <div key={index} className="animate-fadeIn">
            {text}
          </div>
        ))}
      </div>
      <div className="mt-8 flex space-x-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}

export default BootScreen
