"use client"

import { useState, useEffect, type ReactNode } from "react"

interface DesktopOnlyProps {
  children: ReactNode
}

const DesktopOnly = ({ children }: DesktopOnlyProps) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null) // null initially to handle hydration

  useEffect(() => {
    const checkDeviceType = () => {
      // Define your breakpoint for mobile/tablet. Common breakpoint for small tablets/phones is 768px.
      setIsMobile(window.innerWidth < 768)
    }

    // Run once on mount
    checkDeviceType()

    // Add event listener for window resize
    window.addEventListener("resize", checkDeviceType)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkDeviceType)
    }
  }, [])

  // During hydration, or if detection hasn't run yet, render nothing or a loading state
  if (isMobile === null) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-lg">Loading...</div>
    )
  }

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-lg p-4 text-center">
        This application is available only on desktop/laptop devices.
      </div>
    )
  }

  return <>{children}</>
}

export default DesktopOnly
