{
  ;('"use client"')
}
import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useDesktopStore } from "@/lib/store"
import WindowManager from "./window-manager"
import Taskbar from "./taskbar"
import DesktopIcon from "./desktop-icon"
import BootScreen from "./boot-screen"
import { Terminal, FolderOpen, FileText, Mail } from "lucide-react"
import ContextMenu from "./context-menu"
import { FolderPlus, FilePlus, RefreshCw, Settings, Trash2, Palette, Power } from "lucide-react"

const Desktop = () => {
  const { isBooting, setBooting, openWindow, showContextMenu } = useDesktopStore()
  const [currentTime, setCurrentTime] = useState(new Date())
  const workAreaRef = useRef<HTMLDivElement>(null)
  const [isShuttingDown, setIsShuttingDown] = useState(false)
  const [showPowerOffScreen, setShowPowerOffScreen] = useState(false)
  const [shutdownScreenOpacity, setShutdownScreenOpacity] = useState(1) // New state for fade effect

  // New state for wallpaper and wallpaper array
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0)
  
const wallpapers = ["wallpaper1.png", "wallpaper2.png", "wallpaper3.png","wallpaper4.png","wallpaper5.png"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isBooting) {
      const timer = setTimeout(() => {
        setBooting(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isBooting, setBooting])

  useEffect(() => {
    if (isShuttingDown) {
      const shutdownAnimationDuration = 2000 // Duration for "Shutting down..." animation
      const fadeOutDuration = 500 // Duration for fade out

      // Start fade out before the screen fully transitions
      const fadeOutTimer = setTimeout(() => {
        setShutdownScreenOpacity(0)
      }, shutdownAnimationDuration - fadeOutDuration)

      const transitionTimer = setTimeout(() => {
        setIsShuttingDown(false)
        setShowPowerOffScreen(true)
        setShutdownScreenOpacity(1) // Reset opacity for next shutdown
      }, shutdownAnimationDuration)

      return () => {
        clearTimeout(fadeOutTimer)
        clearTimeout(transitionTimer)
      }
    }
  }, [isShuttingDown, setShowPowerOffScreen, setIsShuttingDown])

  const desktopIcons = [
    {
      id: "terminal",
      title: "Terminal",
      icon: Terminal,
      component: "Terminal",
      position: { x: 100, y: 100 },
      size: { width: 800, height: 600 },
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderOpen,
      component: "Projects",
      position: { x: 200, y: 150 },
      size: { width: 900, height: 700 },
    },
    {
      id: "resume",
      title: "Resume",
      icon: FileText,
      component: "Resume",
      position: { x: 300, y: 200 },
      size: { width: 700, height: 800 },
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      component: "Contact",
      position: { x: 400, y: 250 },
      size: { width: 600, height: 500 },
    },
  ]

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const contextMenuItems = [
   
      {
        id: "separator-1",
        label: "",
        separator: true,
        action: () => {},
      },
      {
        id: "refresh",
        label: "Refresh",
        icon: RefreshCw,
        action: () => {
          console.log("Refreshing desktop...")
          window.location.reload()
        },
      },
      {
        id: "separator-2",
        label: "",
        separator: true,
        action: () => {},
      },
      {
        id: "change-wallpaper",
        label: "Change Wallpaper",
        icon: Palette,
        action: () => {
          console.log("Changing wallpaper...")
          // Cycle through wallpapers
          setCurrentWallpaperIndex((prevIndex) => (prevIndex + 1) % wallpapers.length)
        },
      },
       {
        id: "separator-2",
        label: "",
        separator: true,
        action: () => {},
      },
      {
        id: "shutdown",
        label: "Shutdown",
        icon: Power,
        action: () => {
          console.log("Shutting down...")
          setIsShuttingDown(true)
        },
      },
      {
        id: "separator-3",
        label: "",
        separator: true,
        action: () => {},
      },
      
    
    ]
    showContextMenu(e.clientX, e.clientY, contextMenuItems)
  }

  if (isBooting) {
    return <BootScreen />
  }

  return (
    <>
      {/* Step 1: Shutting down animation - only show if isShuttingDown is true and power off screen is not yet active */}
      {isShuttingDown && (
        <div
          className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50 text-white text-center transition-opacity duration-500 ease-out"
          style={{ opacity: shutdownScreenOpacity }}
        >
          <div className="mb-8 text-4xl font-bold">Shutting down...</div>
          {/* Windows 11 style spinning circle */}
          <div className="w-12 h-12 border-4 border-t-4 border-gray-400 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {/* Step 2: Power off screen - only show if showPowerOffScreen is true */}
      {showPowerOffScreen && (
        <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50 text-white text-center">
          <div className="mb-8 text-4xl font-bold">System is off</div>
          <button
            className="mt-10 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            onClick={() => {
              // When powering on, reset power off screen and trigger boot sequence
              setShowPowerOffScreen(false)
              setBooting(true)
            }}
          >
            Power On
          </button>
        </div>
      )}
      <div
        className="h-screen w-screen overflow-hidden relative"
        style={{
          backgroundImage: `url(${wallpapers[currentWallpaperIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onContextMenu={handleContextMenu}
      >
       
        {/* Desktop icons and Window Manager - now positioned above the taskbar */}
        <div ref={workAreaRef} className="absolute top-0 left-0 right-0 h-[calc(100vh-56px)] p-8">
          <div className="grid grid-cols-1 gap-6 w-fit">
            {desktopIcons.map((icon, index) => (
              <DesktopIcon
                key={icon.id}
                icon={icon.icon}
                title={icon.title}
                onClick={() =>
                  openWindow({
                    id: icon.id,
                    title: icon.title,
                    component: icon.component,
                    isMinimized: false,
                    isMaximized: false,
                    position: icon.position,
                    size: icon.size,
                  })
                }
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            ))}
          </div>
          {/* Window Manager */}
          <WindowManager workAreaRef={workAreaRef} />
        </div>
        {/* Taskbar - Ensure this component has a solid background (e.g., bg-gray-800) in its own file (taskbar.tsx) */}
        <Taskbar currentTime={currentTime} />
        <ContextMenu />
      </div>
    </>
  )
}

export default Desktop
