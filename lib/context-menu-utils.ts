"use client"

import type React from "react"

export const adjustMenuPosition = (x: number, y: number, menuWidth: number, menuHeight: number) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const padding = 10

  let adjustedX = x
  let adjustedY = y

  // Adjust horizontal position if menu would overflow right edge
  if (x + menuWidth > viewportWidth - padding) {
    adjustedX = viewportWidth - menuWidth - padding
  }

  // Adjust vertical position if menu would overflow bottom edge
  if (y + menuHeight > viewportHeight - padding) {
    adjustedY = viewportHeight - menuHeight - padding
  }

  // Ensure menu doesn't go off left or top edges
  adjustedX = Math.max(padding, adjustedX)
  adjustedY = Math.max(padding, adjustedY)

  return { x: adjustedX, y: adjustedY }
}

export const createContextMenuItem = (
  id: string,
  label: string,
  action: () => void,
  options?: {
    icon?: React.ComponentType<{ className?: string }>
    disabled?: boolean
    separator?: boolean
  },
) => ({
  id,
  label,
  action,
  ...options,
})

export const createSeparator = (id: string) => ({
  id,
  label: "",
  separator: true,
  action: () => {},
})
