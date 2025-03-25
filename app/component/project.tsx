"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with payment integration",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web App",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      longDescription:
        "A comprehensive e-commerce solution built with React on the frontend and Node.js on the backend. Features include product catalog, shopping cart, user authentication, payment processing with Stripe, and order management.",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A drag-and-drop task management application",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web App",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
      longDescription:
        "A task management application that allows users to create, organize, and track tasks using a drag-and-drop interface. Built with React and TypeScript, it uses Firebase for authentication and real-time database.",
    },
  ]

  const categories = ["Web App"]
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" ref={ref} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            My <span className=" text-blue-600">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-gray-300">
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
                    ? "bg-primary hover:bg-primary/90"
                    : "border-primary/20 hover:bg-primary/20 hover:text-primary hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
            >
              <Card className="overflow-hidden h-full bg-slate-800/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 group">
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
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/20 hover:text-primary"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    {/* <Button variant="ghost" size="icon" className="hover:text-primary">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button> */}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open: unknown) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-3xl bg-slate-800 border-primary/20">
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
                  <Badge key={index} variant="outline" className="bg-primary/10">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground">{selectedProject.longDescription}</p>
              <div className="flex justify-between">
                <Button className="bg-primary hover:bg-primary/90">
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
                <Button variant="outline" className="border-primary/20 hover:bg-primary/20 hover:text-primary">
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

