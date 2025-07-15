"use client"

import { useDesktopStore } from "@/lib/store"
import { Terminal, FolderOpen, FileText, Mail, Monitor } from "lucide-react"

interface TaskbarProps {
  currentTime: Date
}

const Taskbar = ({ currentTime }: TaskbarProps) => {
  const { windows, openWindow, focusWindow } = useDesktopStore()

  const getIcon = (component: string) => {
    switch (component) {
      case "Terminal":
        return Terminal
      case "Projects":
        return FolderOpen
      case "Resume":
        return FileText
      case "Contact":
        return Mail
      default:
        return Monitor
    }
  }

  const openWindows = windows.filter((w) => w.isOpen)

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/30 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-4">
      {/* Start Menu / Logo */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Monitor className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Open Windows */}
      <div className="flex items-center space-x-2">
        {openWindows.map((window) => {
          const Icon = getIcon(window.component)
          return (
            <button
              key={window.id}
              onClick={() => {
                if (window.isMinimized) {
                  openWindow({
                    id: window.id,
                    title: window.title,
                    component: window.component,
                    isMinimized: false,
                    isMaximized: window.isMaximized,
                    position: window.position,
                    size: window.size,
                  })
                } else {
                  focusWindow(window.id)
                }
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                window.isMinimized ? "bg-white/10 hover:bg-white/20" : "bg-blue-600/50 hover:bg-blue-600/70"
              }`}
            >
              <Icon className="w-4 h-4 text-white" />
              <span className="text-white text-sm hidden md:block">{window.title}</span>
            </button>
          )
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-4 text-white text-sm">
        <div className="text-right">
          <div>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="text-xs text-gray-300">
            {currentTime.toLocaleDateString([], { month: "short", day: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taskbar
