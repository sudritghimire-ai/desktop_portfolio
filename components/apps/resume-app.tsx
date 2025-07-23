"use client"
import { Download, Mail, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const ResumeApp = () => {
  return (
    <main className="h-full overflow-y-auto bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <div className="mb-6">
            <Image
              src="/sudrit_final.jpg"
              alt="Sudrit Ghimire"
              width={160}
              height={160}
              className="rounded-full mx-auto border-4 border-gray-700 shadow-lg"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">Sudrit Ghimire</h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4">Full Stack Developer</p>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>sudritghimire@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>San Marcos, Texas</span>
            </div>
          </div>
          <Button
            asChild
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors text-base"
          >
            <a href="/Sudrit-Ghimire-cv.pdf" download>
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </Button>
        </header>

        {/* Summary */}
        <Card className="bg-gray-800 border-gray-700 text-gray-300">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl font-bold">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              Full Stack Developer with 3+ years of experience building scalable, efficient web apps using modern tech
              like React, Node.js, MongoDB, Zustand, and Tailwind CSS. Passionate about clean UI/UX, real-time features,
              and cloud deployment.
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="bg-gray-800 border-gray-700 text-gray-300">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl font-bold">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Full Stack Developer</h3>
                <p className="text-blue-400">Self Employed</p>
                <p className="text-sm text-gray-400 mb-2">Sept 2018 - Present, Lalitpur</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Built and deployed multiple real-time full-stack web apps for learning and productivity</li>
                  <li>Created a quiz platform with admin panel, image input, and voice + music modes</li>
                  <li>Worked extensively with Socket.io, Zustand, and TinyMCE for advanced frontend</li>
                  <li>Contributed to open source and developed portfolio OS interface using React RND</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="bg-gray-800 border-gray-700 text-gray-300">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl font-bold">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm">
              <li>
                <strong className="text-yellow-400">Desktop Portfolio OS:</strong> Interactive desktop UI with draggable
                app windows.
                <br /> <span className="text-xs text-gray-400">[React, Next.js, Zustand]</span>
              </li>
              <li>
                <strong className="text-yellow-400">Quiz Management Platform:</strong> Dynamic quiz builder with image,
                voice, and music mode + admin dashboard.
                <br /> <span className="text-xs text-gray-400">[MERN Stack, Chakra UI, EditorJS]</span>
              </li>
              <li>
                <strong className="text-yellow-400">FriendSearch App:</strong> Real-time matching and chat app with
                swipe UX.
                <br /> <span className="text-xs text-gray-400">[Socket.io, MongoDB, Express, React]</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-gray-800 border-gray-700 text-gray-300">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl font-bold">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <li>
                <strong className="text-yellow-400">Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, Chakra
                UI
              </li>
              <li>
                <strong className="text-yellow-400">Backend:</strong> Node.js, Express, MongoDB, PostgreSQL
              </li>
              <li>
                <strong className="text-yellow-400">Tools:</strong> Zustand, Socket.io, TinyMCE, Git, Vercel
              </li>
              <li>
                <strong className="text-yellow-400">Deployment:</strong> Vercel, Netlify, Railway
              </li>
              <li>
                <strong className="text-yellow-400">Other:</strong> OpenAI APIs, REST, JWT Auth, Editor.js, React RND
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="bg-gray-800 border-gray-700 text-gray-300">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl font-bold">Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Texas State University</strong> — B.S. in Computer Science
                <br />
                <span className="text-gray-400">2025 - Present, San Marcos</span>
              </p>
              <p>
                <strong>Prasadi Academy</strong> — High School
                <br />
                <span className="text-gray-400">2022 - 2025, Lalitpur</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="bg-gray-800 border-gray-700 text-gray-300">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl font-bold">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>100 Hours React Bootcamp — Udemy, 2025</li>
              <li>Complete Frontend Dev Bootcamp — Udemy, 2023</li>
              <li>Flask + Python Practice Course — Udemy, 2024</li>
              <li>MIT OpenCourseWare — Math Courses, 2025</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ResumeApp
