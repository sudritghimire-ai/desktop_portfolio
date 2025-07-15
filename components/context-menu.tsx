"use client"

import React, { useEffect, useRef } from "react"
import { useDesktopStore, type ContextMenuItem } from "@/lib/store"

const ContextMenu = () => {
  const { contextMenu, hideContextMenu } = useDesktopStore()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideContextMenu()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hideContextMenu()
      }
    }

    if (contextMenu.isVisible) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [contextMenu.isVisible, hideContextMenu])

  const adjustPosition = (x: number, y: number) => {
    if (!menuRef.current) return { x, y }

    const menuRect = menuRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let adjustedX = x
    let adjustedY = y

    // Adjust horizontal position if menu would overflow right edge
    if (x + menuRect.width > viewportWidth) {
      adjustedX = viewportWidth - menuRect.width - 10
    }

    // Adjust vertical position if menu would overflow bottom edge
    if (y + menuRect.height > viewportHeight) {
      adjustedY = viewportHeight - menuRect.height - 10
    }

    // Ensure menu doesn't go off left or top edges
    adjustedX = Math.max(10, adjustedX)
    adjustedY = Math.max(10, adjustedY)

    return { x: adjustedX, y: adjustedY }
  }

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled) {
      item.action()
      hideContextMenu()
    }
  }

  if (!contextMenu.isVisible) return null

  const position = adjustPosition(contextMenu.position.x, contextMenu.position.y)

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-gray-800/95 backdrop-blur-md border border-gray-600 rounded-lg shadow-2xl py-2 min-w-[200px]"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {contextMenu.items.map((item, index) => (
        <React.Fragment key={item.id}>
          {item.separator ? (
            <div className="h-px bg-gray-600 mx-2 my-1" />
          ) : (
            <button
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-3 transition-colors ${
                item.disabled
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white hover:bg-gray-700/50 cursor-pointer"
              }`}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContextMenu
