"use client"

import type React from "react"

import { useDesktopStore } from "@/lib/store"
import Window from "./window"
import TerminalApp from "./apps/terminal-app"
import ProjectsApp from "./apps/projects-app"
import ResumeApp from "./apps/resume-app"
import ContactApp from "./apps/contact-app"

interface WindowManagerProps {
  workAreaRef: React.RefObject<HTMLDivElement>
}

const WindowManager = ({ workAreaRef }: WindowManagerProps) => {
  const { windows } = useDesktopStore()

  const getAppComponent = (component: string) => {
    switch (component) {
      case "Terminal":
        return <TerminalApp />
      case "Projects":
        return <ProjectsApp />
      case "Resume":
        return <ResumeApp />
      case "Contact":
        return <ContactApp />
      default:
        return <div>Unknown app</div>
    }
  }

  return (
    <>
      {windows
        .filter((window) => window.isOpen && !window.isMinimized)
        .map((window) => (
          <Window key={window.id} window={window} boundsElement={workAreaRef.current}>
            {getAppComponent(window.component)}
          </Window>
        ))}
    </>
  )
}

export default WindowManager
