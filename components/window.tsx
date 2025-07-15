"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Rnd } from "react-rnd"
import { useDesktopStore, type WindowState } from "@/lib/store"
import { X, Minus, Square } from "lucide-react"

interface WindowProps {
  window: WindowState
  children: React.ReactNode
  boundsElement: HTMLElement | null // For bounds prop
}

const TASKBAR_HEIGHT = 56 // Your website taskbar height (Tailwind h-14)

const Window = ({ window, children, boundsElement }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } =
    useDesktopStore()
  const rndRef = useRef<Rnd>(null)

  // On maximize, resize window to fill viewport minus taskbar
  useEffect(() => {
    if (window.isMaximized && rndRef.current) {
      rndRef.current.updatePosition({ x: 0, y: 0 })
      rndRef.current.updateSize({
        width: globalThis.window.innerWidth || 1200,
        height: (globalThis.window.innerHeight || 800) - TASKBAR_HEIGHT,
      })
    }
  }, [window.isMaximized])

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      }}
      minWidth={300}
      minHeight={200}
      bounds={boundsElement ?? undefined}
      dragHandleClassName="window-header"
      onDragStop={(e, d) => {
        if (!window.isMaximized) {
          // Clamp position to viewport and taskbar boundary
          const viewportWidth = globalThis.window.innerWidth
          const viewportHeight = globalThis.window.innerHeight

          // Calculate max X and Y coordinates for the window's top-left corner
          // Max X: viewport width minus window's current width
          const maxX = viewportWidth - window.size.width
          // Max Y: viewport height minus taskbar height minus window's current height
          const maxY = viewportHeight - TASKBAR_HEIGHT - window.size.height

          // Clamp d.x between 0 (left edge) and maxX (right edge)
          const clampedX = Math.min(Math.max(d.x, 0), maxX)
          // Clamp d.y between 0 (top edge) and maxY (above taskbar)
          const clampedY = Math.min(Math.max(d.y, 0), maxY)

          updateWindowPosition(window.id, { x: clampedX, y: clampedY })
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!window.isMaximized) {
          const newWidth = Number.parseInt(ref.style.width)
          const newHeight = Number.parseInt(ref.style.height)

          const viewportWidth = globalThis.window.innerWidth
          const viewportHeight = globalThis.window.innerHeight

          // Calculate max X and Y coordinates for the window's top-left corner
          // based on the new size
          const maxX = viewportWidth - newWidth
          const maxY = viewportHeight - TASKBAR_HEIGHT - newHeight

          // Clamp position.x between 0 (left edge) and maxX (right edge)
          const clampedX = Math.min(Math.max(position.x, 0), maxX)
          // Clamp position.y between 0 (top edge) and maxY (above taskbar)
          const clampedY = Math.min(Math.max(position.y, 0), maxY)

          updateWindowSize(window.id, {
            width: newWidth,
            height: newHeight,
          })
          updateWindowPosition(window.id, { x: clampedX, y: clampedY })
        }
      }}
      style={{ zIndex: window.zIndex }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
    >
      <div
        className="h-full bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
        onClick={() => focusWindow(window.id)}
      >
        {/* Window Header */}
        <div className="window-header flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700 cursor-move">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeWindow(window.id)
              }}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group"
              aria-label="Close window"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                minimizeWindow(window.id)
              }}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center group"
              aria-label="Minimize window"
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                maximizeWindow(window.id)
              }}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center group"
              aria-label="Maximize window"
            >
              <Square className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <div className="text-gray-300 text-sm font-medium truncate max-w-xs">{window.title}</div>
          <div className="w-16"></div>
        </div>
        {/* Window Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </Rnd>
  )
}

export default Window
