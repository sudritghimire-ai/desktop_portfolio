"use client"
import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label" // Assuming Label component is available or can be created

const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent! (This is a demo)")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="h-full overflow-y-auto bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Heading */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Get In Touch</h1>
          <p className="text-gray-400 text-lg">
            I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>
        </header>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700 text-center p-4">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Email</h3>
              <p className="text-gray-400 text-sm">sudritghimire@gmail.com</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 text-center p-4">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <Phone className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Phone</h3>
              <p className="text-gray-400 text-sm">+977 9800000000</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 text-center p-4">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <MapPin className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Location</h3>
              <p className="text-gray-400 text-sm">San Marcos, Texas</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            <a href="https://github.com/sudritghimire-ai" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-6 h-6 text-gray-400" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            <a
              href="https://www.linkedin.com/in/sudrit-ghimire-71135b354/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-blue-400" />
            </a>
          </Button>
        </div>

        {/* Contact Form */}
        <Card className="bg-gray-800 border-gray-700 p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl font-bold text-white">Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                  placeholder="Subject"
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 resize-none focus-visible:ring-blue-500"
                  placeholder="Write your message..."
                />
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-base"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <CardContent className="p-0">
            <p className="text-sm text-gray-400 text-center">
              💡 <strong>Quick Response:</strong> I typically respond within 24 hours. Feel free to reach out on
              LinkedIn or email.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ContactApp
