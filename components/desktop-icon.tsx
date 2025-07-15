"use client"

import type { LucideIcon } from "lucide-react"
import type { CSSProperties } from "react"

interface DesktopIconProps {
  icon: LucideIcon
  title: string
  onClick: () => void
  style?: CSSProperties
}

const DesktopIcon = ({ icon: Icon, title, onClick, style }: DesktopIconProps) => {
  return (
    <div className="flex flex-col items-center cursor-pointer group animate-fadeIn" onClick={onClick} style={style}>
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/20 transition-all duration-200 group-hover:scale-110 border border-white/20">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-white text-sm font-medium text-center group-hover:text-blue-200 transition-colors">
        {title}
      </span>
    </div>
  )
}

export default DesktopIcon
