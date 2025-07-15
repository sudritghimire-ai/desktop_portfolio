"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Terminal, Download, ExternalLink, Mail, Github, Linkedin } from "lucide-react"

interface Command {
  input: string
  output: React.ReactNode
  timestamp: Date
}

const TerminalPortfolio = () => {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
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

  const bootSequence = [
    "Initializing portfolio system...",
    "Loading developer profile...",
    "Mounting project directories...",
    "Starting terminal interface...",
    'System ready. Type "help" for available commands.',
  ]

  useEffect(() => {
    if (isBooting) {
      let index = 0
      const bootInterval = setInterval(() => {
        if (index < bootSequence.length) {
          setHistory((prev) => [
            ...prev,
            {
              input: "",
              output: <span className="text-green-400">{bootSequence[index]}</span>,
              timestamp: new Date(),
            },
          ])
          index++
        } else {
          setIsBooting(false)
          clearInterval(bootInterval)
        }
      }, 800)
      return () => clearInterval(bootInterval)
    }
  }, [isBooting])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current && !isBooting) {
      inputRef.current.focus()
    }
  }, [isBooting])

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output: React.ReactNode

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1">Available Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
              <div>
                <span className="text-green-400">help</span> - Show this help message
              </div>
              <div>
                <span className="text-green-400">about</span> - About me
              </div>
              <div>
                <span className="text-green-400">projects</span> - View my projects
              </div>
              <div>
                <span className="text-green-400">skills</span> - Technical skills
              </div>
              <div>
                <span className="text-green-400">contact</span> - Contact information
              </div>
              <div>
                <span className="text-green-400">resume</span> - Download resume
              </div>
              <div>
                <span className="text-green-400">whoami</span> - Current user info
              </div>
              <div>
                <span className="text-green-400">date</span> - Current date/time
              </div>
              <div>
                <span className="text-green-400">ls</span> - List directory contents
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
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1">About Me</div>
            <div className="space-y-2">
              <p>👋 Hi! I'm a passionate full-stack developer with expertise in modern web technologies.</p>
              <p>🚀 I love building scalable applications and exploring new technologies.</p>
              <p>💡 Always eager to learn and contribute to innovative projects.</p>
              <p>🎯 Currently focused on React, Next.js, TypeScript, and cloud technologies.</p>
            </div>
          </div>
        )
        break

      case "projects":
        output = (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1">Featured Projects</div>
            <div className="space-y-4">
              <div className="border border-gray-600 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400 font-bold">E-Commerce Platform</span>
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Full-stack e-commerce solution with React, Node.js, and PostgreSQL
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-blue-600 px-2 py-1 rounded">React</span>
                  <span className="bg-green-600 px-2 py-1 rounded">Node.js</span>
                  <span className="bg-purple-600 px-2 py-1 rounded">PostgreSQL</span>
                </div>
              </div>

              <div className="border border-gray-600 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400 font-bold">Task Management App</span>
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Real-time collaborative task management with Next.js and Socket.io
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-black px-2 py-1 rounded">Next.js</span>
                  <span className="bg-blue-600 px-2 py-1 rounded">TypeScript</span>
                  <span className="bg-red-600 px-2 py-1 rounded">Socket.io</span>
                </div>
              </div>

              <div className="border border-gray-600 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400 font-bold">AI Chat Interface</span>
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Modern chat interface with AI integration and real-time responses
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-cyan-600 px-2 py-1 rounded">React</span>
                  <span className="bg-yellow-600 px-2 py-1 rounded">OpenAI</span>
                  <span className="bg-green-600 px-2 py-1 rounded">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        )
        break

      case "skills":
        output = (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1">Technical Skills</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-yellow-400 font-semibold mb-2">Frontend</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>React/Next.js</span>
                    <span className="text-green-400">████████░░ 80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TypeScript</span>
                    <span className="text-green-400">███████░░░ 70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tailwind CSS</span>
                    <span className="text-green-400">████████░░ 80%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-yellow-400 font-semibold mb-2">Backend</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Node.js</span>
                    <span className="text-green-400">███████░░░ 70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PostgreSQL</span>
                    <span className="text-green-400">██████░░░░ 60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MongoDB</span>
                    <span className="text-green-400">██████░░░░ 60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        break

      case "contact":
        output = (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold border-b border-gray-600 pb-1">Contact Information</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400" />
                <span>developer@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-400" />
                <span>github.com/developer</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>linkedin.com/in/developer</span>
              </div>
            </div>
            <div className="mt-4 p-3 border border-gray-600 rounded bg-gray-800/50">
              <p className="text-sm">💬 Feel free to reach out for collaborations, opportunities, or just to say hi!</p>
            </div>
          </div>
        )
        break

      case "resume":
      case "wget resume.pdf":
        output = (
          <div className="space-y-3">
            <div className="text-cyan-400 font-bold">Resume Download</div>
            <div className="flex items-center gap-2 p-3 border border-gray-600 rounded bg-gray-800/50">
              <Download className="w-5 h-5 text-green-400" />
              <span>resume.pdf</span>
              <button
                className="ml-auto bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                onClick={() => {
                  // In a real app, this would trigger a download
                  alert("Resume download would start here!")
                }}
              >
                Download
              </button>
            </div>
            <p className="text-sm text-gray-400">Click the download button to get my latest resume.</p>
          </div>
        )
        break

      case "whoami":
        output = (
          <div className="space-y-2">
            <div className="text-green-400">guest@portfolio:~$</div>
            <div>Full Stack Developer</div>
            <div>Location: Remote</div>
            <div>Status: Available for opportunities</div>
          </div>
        )
        break

      case "date":
        output = <div className="text-green-400">{new Date().toString()}</div>
        break

      case "ls":
      case "ls -la":
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
            <div className="text-green-400">
              -rw-r--r-- 1 user user 512 {new Date().toLocaleDateString()} contact.txt
            </div>
          </div>
        )
        break

      case "pwd":
        output = <div className="text-green-400">/home/developer/portfolio</div>
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
      } else if (matches.length > 1) {
        const commonPrefix = matches.reduce((prefix, cmd) => {
          let i = 0
          while (i < prefix.length && i < cmd.length && prefix[i] === cmd[i]) {
            i++
          }
          return prefix.slice(0, i)
        })
        setInput(commonPrefix)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl h-[80vh] bg-gray-900/90 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Terminal className="w-4 h-4" />
          <span className="text-sm">developer@portfolio</span>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-900 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Command history */}
        {history.map((command, index) => (
          <div key={index} className="mb-4">
            {command.input && (
              <div className="flex items-center space-x-2 text-green-400">
                <span>guest@portfolio:~$</span>
                <span>{command.input}</span>
              </div>
            )}
            <div className="mt-1 text-gray-100">{command.output}</div>
          </div>
        ))}

        {/* Current input */}
        {!isBooting && (
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <span className="text-green-400">guest@portfolio:~$</span>
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
        )}
      </div>
    </div>
  )
}

export default TerminalPortfolio
