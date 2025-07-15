"use client"

import { useState, useEffect, type ReactNode } from "react"

interface DesktopOnlyProps {
  children: ReactNode
}

const DesktopOnly = ({ children }: DesktopOnlyProps) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null) // null initially to handle hydration

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkDeviceType()

    window.addEventListener("resize", checkDeviceType)
    return () => window.removeEventListener("resize", checkDeviceType)
  }, [])

  // During hydration or detection delay
  if (isMobile === null) {
    return (
      <div
        className="flex items-center justify-center h-screen w-screen bg-black text-white text-lg"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          userSelect: "none",
        }}
      >
        Loading...
      </div>
    )
  }

  if (isMobile) {
    return (
      <div
        className="flex items-center justify-center h-screen w-screen bg-black text-white text-lg p-4 text-center"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          userSelect: "none",
          // Ensure no scaling or blurry fonts on mobile
          transform: "none",
          zoom: 1,
        }}
      >
        This application is available only on desktop/laptop devices.
      </div>
    )
  }

  return <>{children}</>
}

export default DesktopOnly
