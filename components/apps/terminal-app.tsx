"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Download, ExternalLink, Mail, Github, Linkedin } from "lucide-react"

interface Command {
  input: string
  output: React.ReactNode
  timestamp: Date
}

const TerminalApp = () => {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const availableCommands = [
    "help",
    "about",
    "projects",
    "skills",
    "contact",
    "resume",
    "clear",
    "whoami",
    "date",
    "ls",
    "pwd",
    "cat",
    "wget",
  ]

  useEffect(() => {
    setHistory([
      {
        input: "",
        output: (
          <span className="text-green-400">Welcome to PortfolioOS Terminal. Type 'help' for available commands.</span>
        ),
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output: React.ReactNode

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1">Available Commands:</div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div>
                <span className="text-green-400">help</span> - Show this help
              </div>
              <div>
                <span className="text-green-400">about</span> - About me
              </div>
              <div>
                <span className="text-green-400">projects</span> - My projects
              </div>
              <div>
                <span className="text-green-400">skills</span> - Technical skills
              </div>
              <div>
                <span className="text-green-400">contact</span> - Contact info
              </div>
              <div>
                <span className="text-green-400">resume</span> - Download resume
              </div>
              <div>
                <span className="text-green-400">whoami</span> - User info
              </div>
              <div>
                <span className="text-green-400">date</span> - Current date
              </div>
              <div>
                <span className="text-green-400">ls</span> - List files
              </div>
              <div>
                <span className="text-green-400">clear</span> - Clear terminal
              </div>
            </div>
          </div>
        )
        break

     case "about":
  output = (
    <div className="space-y-4">
      <div className="text-cyan-400 font-bold border-b border-gray-600 pb-2 text-lg">About Me</div>
      <div className="space-y-3 text-sm text-gray-300">
        <p>👋 Hi! I'm <span className="text-yellow-400 font-semibold">Sudrit Ghimire</span>, a passionate full-stack developer with expertise in modern web technologies.</p>
        <p>🚀 I love building scalable applications and exploring new technologies.</p>
        <p>💡 Always eager to learn and contribute to innovative projects.</p>
        <p>🎯 Currently focused on React, Next.js, TypeScript, and cloud technologies.</p>
      </div>

      <div className="border-l-2 border-green-400 pl-4 space-y-1 text-sm text-white">
        <div><strong>Name:</strong> Sudrit Ghimire</div>
        <div><strong>Location:</strong> San Marcos, Texas</div>
        <div><strong>Email:</strong> sudritghimire@gmail.com</div>
        <div><strong>Education:</strong> Bachelor of Science (B.S.), Texas State University (2025 - Present)</div>
        <div><strong>Previous Education:</strong> Prasadi Academy, Lalitpur (2022 - 2025)</div>
        <div><strong>Experience:</strong> 3+ years building full-stack web applications and real-time interactive apps.</div>
        <div><strong>Languages:</strong> Nepali, Japanese, English, Hindi</div>
      </div>

      <div className="mt-3 text-gray-400 italic text-sm">
        When I'm not coding, I enjoy exploring the outdoors and contributing to open-source projects.
      </div>
    </div>
  )
  break


    case "projects":
  output = (
    <div className="space-y-4">
      <div className="text-cyan-400 font-bold border-b border-gray-600 pb-2 text-lg">
        Featured Projects
      </div>

      <div className="space-y-4">
        {/* Desktop Portfolio OS */}
        <div className="border border-gray-600 rounded p-4 bg-gray-900/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold text-base">Desktop Portfolio OS</span>
            <ExternalLink className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Interactive desktop environment portfolio with draggable windows
          </p>
          <div className="flex gap-2 text-xs flex-wrap">
            <span className="bg-blue-600 px-2 py-1 rounded">React</span>
            <span className="bg-black px-2 py-1 rounded">Next.js</span>
            <span className="bg-purple-600 px-2 py-1 rounded">Zustand</span>
          </div>
        </div>

        {/* You can add more projects here in the same style */}
        {/* Example: */}
        <div className="border border-gray-600 rounded p-4 bg-gray-900/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold text-base">FriendSearch App</span>
            <ExternalLink className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Real-time swipe matching and chat app improving user engagement
          </p>
          <div className="flex gap-2 text-xs flex-wrap">
            <span className="bg-blue-600 px-2 py-1 rounded">React Native</span>
            <span className="bg-green-600 px-2 py-1 rounded">Node.js</span>
            <span className="bg-yellow-600 px-2 py-1 rounded">Socket.io</span>
          </div>
        </div>

        <div className="border border-gray-600 rounded p-4 bg-gray-900/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold text-base">Quiz Management Platform</span>
            <ExternalLink className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Robust quiz platform with image support and admin controls
          </p>
          <div className="flex gap-2 text-xs flex-wrap">
            <span className="bg-blue-600 px-2 py-1 rounded">React</span>
            <span className="bg-black px-2 py-1 rounded">Node.js</span>
            <span className="bg-indigo-600 px-2 py-1 rounded">MongoDB</span>
          </div>
        </div>
      </div>
    </div>
  )
  break

      case "skills":
  output = (
    <div className="space-y-4">
      <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1 text-lg">Technical Skills</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <div className="text-yellow-400 font-semibold mb-2">Frontend</div>
          <ul className="list-disc list-inside text-sm text-white space-y-1">
            <li>React / Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Vue.js</li>
            <li>JavaScript (ES6+)</li>
          </ul>
        </div>

        <div>
          <div className="text-yellow-400 font-semibold mb-2">Backend & Databases</div>
          <ul className="list-disc list-inside text-sm text-white space-y-1">
            <li>Node.js / Express</li>
            <li>MongoDB</li>
            <li>PostgreSQL</li>
            <li>Prisma ORM</li>
            <li>Python / Flask</li>
          </ul>
        </div>

        <div>
          <div className="text-yellow-400 font-semibold mb-2">Tools & DevOps</div>
          <ul className="list-disc list-inside text-sm text-white space-y-1">
            <li>Docker</li>
            <li>AWS</li>
            <li>Git / GitHub</li>
            <li>Zustand (State Management)</li>
            <li>Socket.io</li>
          </ul>
        </div>

        <div>
          <div className="text-yellow-400 font-semibold mb-2">Other Skills</div>
          <ul className="list-disc list-inside text-sm text-white space-y-1">
            <li>Linux / Bash</li>
            <li>OpenWeather API / REST APIs</li>
            <li>TinyMCE (Rich Text Editor)</li>
          </ul>
        </div>

      </div>
    </div>
  )
  break


case "contact":
  output = (
    <div className="space-y-4">
      <div className="text-cyan-400 font-bold border-b border-gray-600 pb-2 text-lg">
        Contact Information
      </div>

      <div className="space-y-3 text-sm text-white">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-red-400" />
          <a href="mailto:sudritghimire@gmail.com" className="underline hover:text-red-300">
            sudritghimire@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Github className="w-5 h-5 text-gray-400" />
          <a
            href="https://github.com/sudritghimire-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            github.com/sudritghimire-ai
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Linkedin className="w-5 h-5 text-blue-400" />
          <a
            href="https://www.linkedin.com/in/sudrit-ghimire-71135b354/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-300"
          >
            linkedin.com/in/sudrit-ghimire-71135b354
          </a>
        </div>
      </div>

      <div className="mt-3 text-gray-400 text-xs italic">
        Feel free to reach out for collaborations or just to say hi! 🙂
      </div>
    </div>
  )
  break


case "resume":
  output = (
    <div className="space-y-4">
      <div className="text-cyan-400 font-bold text-lg">Resume Download</div>
      <div className="flex items-center gap-3 p-4 border border-gray-600 rounded bg-gray-800/50">
        <Download className="w-6 h-6 text-green-400" />
        <span className="text-white">sudrit_ghimire_cv.pdf</span>
        <a
          href="/Sudrit-Ghimire-cv.pdf"  
          download
          className="ml-auto bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-white transition-colors cursor-pointer"
          aria-label="Download Resume"
        >
          Download
        </a>
      </div>
    </div>
  )
  break


    case "whoami":
  output = (
    <div className="space-y-2 text-sm text-white">
      <div className="text-green-400 font-mono">user@portfolioos:~$</div>
      <div><strong>Full Stack Developer</strong></div>
      <div>Location: San Marcos, Texas</div>
      <div>Status: Available for opportunities</div>
    </div>
  )
  break


      case "date":
        output = <div className="text-green-400">{new Date().toString()}</div>
        break

      case "ls":
        output = (
          <div className="space-y-1 font-mono text-sm">
            <div className="text-blue-400">drwxr-xr-x 2 user user 4096 {new Date().toLocaleDateString()} projects/</div>
            <div className="text-blue-400">drwxr-xr-x 2 user user 4096 {new Date().toLocaleDateString()} skills/</div>
            <div className="text-green-400">
              -rw-r--r-- 1 user user 2048 {new Date().toLocaleDateString()} resume.pdf
            </div>
            <div className="text-green-400">
              -rw-r--r-- 1 user user 1024 {new Date().toLocaleDateString()} about.txt
            </div>
          </div>
        )
        break

      case "pwd":
        output = <div className="text-green-400">/home/user/portfolio</div>
        break

      case "clear":
        setHistory([])
        return

      case "":
        return

      default:
        output = (
          <div className="text-red-400">
            Command not found: {trimmedCmd}
            <br />
            Type 'help' for available commands.
          </div>
        )
    }

    const newCommand: Command = {
      input: cmd,
      output,
      timestamp: new Date(),
    }

    setHistory((prev) => [...prev, newCommand])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      handleCommand(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const matches = availableCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white font-mono text-sm">
      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
        {history.map((command, index) => (
          <div key={index} className="mb-4">
            {command.input && (
              <div className="flex items-center space-x-2 text-green-400">
                <span>user@portfolioos:~$</span>
                <span>{command.input}</span>
              </div>
            )}
            <div className="mt-1 text-gray-100">{command.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <span className="text-green-400">user@portfolioos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white caret-green-400"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}

export default TerminalApp
