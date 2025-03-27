"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Github, ExternalLink } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  github: string
  demo: string
  longDescription: string
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const [filter, setFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with payment integration",
      image: "/app1.png?height=400&width=600",
      category: "Web App",
      technologies: ["React","Redux", "Node.js", "MongoDB", "Express.Js"],
      github: "https://github.com",
      demo: "https://client-virid-rho.vercel.app/",
      longDescription:
        "A comprehensive e-commerce solution built with React on the frontend and Node.js on the backend. Features include product catalog, shopping cart, user authentication, payment processing with Stripe, and order management.",
    },
    {
      id: 2,
      title: "Blog Application",
      description: "A drag-and-drop Blog Application application",
      image: "/app2.png?height=400&width=600",
      category: "Web App",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
      longDescription:
        "A well-crafted blog application is more than just a platform for publishing articles—it’s a dynamic space where ideas come to life. Our blog application, built with a modern tech stack, offers a seamless and engaging experience for both writers and readers. With a clean and intuitive user interface, authors can effortlessly create, edit, and manage their content, while readers enjoy a smooth browsing experience. The platform supports rich text formatting, media uploads, and categorization to enhance content organization. Built with React and TypeScript, it ensures a fast and responsive performance, while Firebase integration enables real-time updates and secure authentication. Whether you're an individual blogger or managing a multi-author publication, this application provides the perfect balance of simplicity and powerful features to bring your stories to a wider audience.",
    },
    {
      id: 3,
      title: "Ai Dating Application",
      description: "A automated matching Ai dating application",
      image: "/app3.png?height=400&width=600",
      category: "Web App",
      technologies: ["Next.Js", "TypeScript", "Open Ai Api",'MongoDb', "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
      longDescription:
        "An AI-powered dating application revolutionizes the way people connect by using advanced algorithms and machine learning to create meaningful relationships. Unlike traditional dating apps, this platform goes beyond simple swiping by analyzing user preferences, behavior, and personality traits to offer highly compatible matches. With AI-driven chat assistants, users receive personalized conversation starters and dating advice, making interactions more engaging and natural. The application also ensures safety with real-time content moderation and verification features to prevent fake profiles and enhance trust. Built with cutting-edge technologies, including React and AI-based recommendation systems, this dating app provides a seamless, intuitive, and intelligent matchmaking experience, helping users find genuine connections in a more efficient and enjoyable way.",
    },
  ]

  const categories = [ "Web App"]

  // Add these animation variants at the top of your component, after the projects definition
  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Memoize filtered projects to avoid unnecessary re-renders
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" ref={ref} className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            My <span className="text-indigo-400">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Explore my recent projects showcasing my skills and expertise in web development, mobile applications, and
            UI design.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={
                  filter === category
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "border-indigo-500/20 hover:bg-indigo-500/20 hover:text-indigo-400"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={index % 2 === 0 ? leftVariant : rightVariant}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-500/20 hover:bg-indigo-500/20 hover:text-indigo-400"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="hover:text-indigo-400">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-3xl bg-slate-800 border-indigo-500/20">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.category}</DialogDescription>
            </DialogHeader>
            <div className="relative h-64 md:h-80 overflow-hidden rounded-md">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-indigo-500/10 border-indigo-500/30">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-300">{selectedProject.longDescription}</p>
              <div className="flex justify-between">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" className="border-indigo-500/20 hover:bg-indigo-500/20 hover:text-indigo-400">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}

