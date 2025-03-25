"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Server, Palette, Laptop, Globe } from "lucide-react"

type Skill = {
  name: string
  level: number
  icon: React.ReactNode
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Code className="h-6 w-6 text-primary" />,
      skills: [
        { name: "React.js", level: 90, icon: <Laptop className="h-4 w-4 text-primary" /> },
        { name: "Next.js", level: 85, icon: <Laptop className="h-4 w-4 text-primary" /> },
        { name: "TypeScript", level: 80, icon: <Laptop className="h-4 w-4 text-primary" /> },
        { name: "Tailwind CSS", level: 95, icon: <Palette className="h-4 w-4 text-primary" /> },
      ],
    },
    {
      name: "Backend",
      icon: <Server className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Node.js", level: 85, icon: <Server className="h-4 w-4 text-primary" /> },
        { name: "Express.js", level: 80, icon: <Server className="h-4 w-4 text-primary" /> },
        { name: "Prisma", level: 75, icon: <Database className="h-4 w-4 text-primary" /> },
        { name: "GraphQL", level: 70, icon: <Globe className="h-4 w-4 text-primary" /> },
      ],
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            My <span className=" text-blue-400">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-gray-400">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto text-white">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full bg-blue-600/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-primary/10">{category.icon}</div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        {/* Skill Name and Percentage */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {skill.icon}
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm font-semibold">{skill.level}%</span>
                        </div>

                        {/* Skill Progress Bar with Gradient Fill */}
                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1.2, delay: skillIndex * 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

