"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
    "Prisma",
    "GraphQL",
    "Redux",
    "Framer Motion",
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={leftVariant} className="relative">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl shadow-indigo-500/10 group">
              <Image
                src="/logo.jpg"
                alt="Profile"
                width={400}
                height={400}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          <motion.div variants={rightVariant} className="space-y-6">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                About <span className="text-indigo-400">Me</span>
              </h2>
              <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
            </div>

            <p className="text-lg text-gray-300">
              I&apos;m a passionate frontend developer specializing in creating responsive, accessible, and performant
              user interfaces with React and Next.js.
            </p>

            <p className="text-gray-300">
              My journey in web development started with a curiosity for creating digital experiences that are both
              functional and beautiful. I enjoy solving complex problems and turning ideas into reality through clean,
              efficient code.
            </p>

            <Card className="bg-indigo-900/30 backdrop-blur-sm border-indigo-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors duration-300 text-sm py-1.5 text-white border-indigo-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

