"use client"

import { ExternalLink, Github, Star, GitFork } from "lucide-react"

const ProjectsApp = () => {
  const projects = [
    {
      id: 1,
      title: "Desktop Portfolio OS",
      description:
        "Interactive desktop OS portfolio with draggable app windows, taskbar, and windowed interfaces. Mimics a real OS for personal branding.",
      image: "/desktopos.png",
      technologies: ["React", "Next.js", "Zustand", "React-RND", "Tailwind CSS"],
      github: "https://github.com/sudritghimire-ai/desktop_portfolio",
      demo: "https://sudrit.com.np",
      stars: 12,
      forks: 3,
    },
    {
      id: 2,
      title: "Quiz Management Platform",
      description:
        "A powerful MERN-based quiz builder with admin panel, image upload, music/voice mode, screenshot reader, and question database.",
      image: "/exam.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Chakra UI", "EditorJS", "Tesseract.js"],
      github: "https://github.com/sudritghimire-ai/quiz-platform",
      demo: "https://quiz-platform.vercel.app",
      stars: 21,
      forks: 5,
    },
    {
      id: 3,
      title: "FriendSearch App",
      description:
        "Real-time matching app with swipe-based friend discovery, chat, and notifications. Built using Socket.io and MongoDB.",
      image: "/friend.jpg",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/sudritghimire-ai/friendsearch",
      demo: "https://friendsearch.vercel.app",
      stars: 15,
      forks: 2,
    },
    {
      id: 4,
      title: "Campus Write",
      description:
        "Helps Students to know and apply to the universities.",
      image: "/blog.jpg",
      technologies: ["React", "Next.js", "Zustand", "React-RND", "Tailwind CSS","MERN"],
      github: "https://github.com/sudritghimire-ai/CampusWrite",
      demo: "https://springfall-usa.vercel.app/",
      stars: 12,
      forks: 3,
    },
  ]

  return (
    <div className="h-full overflow-y-auto bg-gray-900 text-white">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">A collection of my recent work and open-source builds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="aspect-video bg-gray-700 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-4 h-4" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsApp
