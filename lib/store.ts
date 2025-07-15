"use client"

import { create } from "zustand"
import type React from "react"

export interface WindowState {
  id: string
  title: string
  component: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface ContextMenuState {
  isVisible: boolean
  position: { x: number; y: number }
  items: ContextMenuItem[]
}

export interface ContextMenuItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  action: () => void
  separator?: boolean
  disabled?: boolean
}

interface DesktopStore {
  windows: WindowState[]
  highestZIndex: number
  isBooting: boolean
  contextMenu: ContextMenuState
  // Ensure position and size are omitted here as they are calculated by the store
  openWindow: (windowConfig: Omit<WindowState, "isOpen" | "zIndex" | "position" | "size">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
  setBooting: (booting: boolean) => void
  showContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void
  hideContextMenu: () => void
}

// Define padding and taskbar height constants for consistent calculations
const INITIAL_WINDOW_WIDTH = 600 // Adjusted to "small and medium" size
const INITIAL_WINDOW_HEIGHT = 450 // Adjusted to "small and medium" size
const DESKTOP_TOP_PADDING = 32 // from top-[32px] in Desktop.tsx
const DESKTOP_SIDE_PADDING = 32 // from left-[32px] and right-[32px] in Desktop.tsx
const TASKBAR_HEIGHT = 56 // from bottom-[56px] in Desktop.tsx

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: [],
  highestZIndex: 1000,
  isBooting: true,
  contextMenu: {
    isVisible: false,
    position: { x: 0, y: 0 },
    items: [],
  },

  openWindow: (windowConfig) => {
    const { windows, highestZIndex } = get()
    const existingWindow = windows.find((w) => w.id === windowConfig.id)

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === windowConfig.id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w,
          ),
          highestZIndex: highestZIndex + 1,
        })
      } else {
        get().focusWindow(windowConfig.id)
      }
    } else {
      // Calculate the available work area dimensions
      const workAreaWidth = window.innerWidth - DESKTOP_SIDE_PADDING * 2
      const workAreaHeight = window.innerHeight - DESKTOP_TOP_PADDING - TASKBAR_HEIGHT

      // Calculate the center position within the work area
      const centerX = DESKTOP_SIDE_PADDING + workAreaWidth / 2
      const centerY = DESKTOP_TOP_PADDING + workAreaHeight / 2

      // Calculate the top-left position for the new window to be centered
      const initialX = centerX - INITIAL_WINDOW_WIDTH / 2
      const initialY = centerY - INITIAL_WINDOW_HEIGHT / 2

      set({
        windows: [
          ...windows,
          {
            ...windowConfig,
            isOpen: true,
            zIndex: highestZIndex + 1,
            position: { x: initialX, y: initialY }, // Set calculated position
            size: { width: INITIAL_WINDOW_WIDTH, height: INITIAL_WINDOW_HEIGHT }, // Set calculated size
          },
        ],
        highestZIndex: highestZIndex + 1,
      })
    }
  },

  closeWindow: (id) => {
    set({
      windows: get().windows.filter((w) => w.id !== id),
    })
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    })
  },

  maximizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              // When maximizing, set position to top-left of work area
              position: w.isMaximized ? w.position : { x: DESKTOP_SIDE_PADDING, y: DESKTOP_TOP_PADDING },
              // When maximizing, set size to fill the work area
              size: w.isMaximized
                ? w.size
                : {
                    width: window.innerWidth - DESKTOP_SIDE_PADDING * 2,
                    height: window.innerHeight - DESKTOP_TOP_PADDING - TASKBAR_HEIGHT,
                  },
            }
          : w,
      ),
    })
  },

  focusWindow: (id) => {
    const { highestZIndex } = get()
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w)),
      highestZIndex: highestZIndex + 1,
    })
  },

  updateWindowPosition: (id, position) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, position } : w)),
    })
  },

  updateWindowSize: (id, size) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })
  },

  setBooting: (booting) => {
    set({ isBooting: booting })
  },

  showContextMenu: (x, y, items) => {
    set({
      contextMenu: {
        isVisible: true,
        position: { x, y },
        items,
      },
    })
  },

  hideContextMenu: () => {
    set({
      contextMenu: {
        isVisible: false,
        position: { x: 0, y: 0 },
        items: [],
      },
    })
  },
}))
