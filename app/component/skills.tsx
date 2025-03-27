"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Code className="h-6 w-6 text-indigo-400" />,
      skills: [
        {name: "JavaScript", level: 100, icon: <Laptop className="h-4 w-4 text-indigo-400" />},
        { name: "React.js", level: 90, icon: <Laptop className="h-4 w-4 text-indigo-400" /> },
        { name: "Next.js", level: 85, icon: <Laptop className="h-4 w-4 text-indigo-400" /> },
        { name: "TypeScript", level: 80, icon: <Laptop className="h-4 w-4 text-indigo-400" /> },
        { name: "Tailwind CSS", level: 95, icon: <Palette className="h-4 w-4 text-indigo-400" /> },
      ],
    },
    {
      name: "Backend",
      icon: <Server className="h-6 w-6 text-indigo-400" />,
      skills: [
        { name: "Node.js", level: 85, icon: <Server className="h-4 w-4 text-indigo-400" /> },
        { name: "Express.js", level: 80, icon: <Server className="h-4 w-4 text-indigo-400" /> },
        { name: "Prisma", level: 75, icon: <Database className="h-4 w-4 text-indigo-400" /> },
        { name: "MongoDB", level: 70, icon: <Globe className="h-4 w-4 text-indigo-400" /> },
        { name: "MySQL", level: 60, icon: <Globe className="h-4 w-4 text-indigo-400" /> },
      ],
    },
  ]

  // Add these animation variants at the top of your component, after the skillCategories definition
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

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            My <span className="text-indigo-400">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto text-white">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={index % 2 === 0 ? leftVariant : rightVariant}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-indigo-500/10">{category.icon}</div>
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
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: skillIndex * 0.1, ease: "easeOut" }}
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

