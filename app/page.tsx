"use client"
import Desktop from "@/components/desktop"
import DesktopOnly from "@/components/desktop-only" // Import the new component

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Main terminal container - now wrapped by DesktopOnly */}
      <div className="flex items-center justify-center min-h-screen">
        <DesktopOnly>
          <Desktop />
        </DesktopOnly>
      </div>
    </div>
  )
}
