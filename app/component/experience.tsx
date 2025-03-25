"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experience = {
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    duration: "2021 - Present",
    description:
      "Leading frontend development for enterprise SaaS products with a focus on performance optimization and team leadership.",
    responsibilities: [
      "Architected and implemented new features for the company's flagship product",
      "Led a team of 5 developers, providing mentorship and code reviews",
      "Improved application performance by 40% through code optimization",
      "Implemented CI/CD pipelines and testing strategies",
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Jest", "Redux", "Tailwind CSS"],
  }

  return (
    <section id="experience" ref={ref} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Work <span className="text-primary text-blue-400">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            My professional journey and expertise in frontend development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-blue-600/50 backdrop-blur-sm border-primary/20 overflow-hidden shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                </div>

                <div className="flex-grow space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{experience.role}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-white/80">
                      <span className="text-lg font-medium">{experience.company}</span>
                      <span className="hidden md:inline">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{experience.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/90 text-lg">{experience.description}</p>

                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Key Responsibilities</h4>
                    <ul className="space-y-3">
                      {experience.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          className="bg-primary/20 text-white border-primary/30 hover:bg-primary/30 px-3 py-1 text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

