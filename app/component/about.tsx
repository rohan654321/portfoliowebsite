"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
    <section id="about" ref={ref} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/10 group">
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

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                About <span className=" text-blue-800">Me</span>
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full "></div>
            </div>

            <p className="text-muted-foreground text-lg text-gray-400">
              I&apos;m a passionate frontend developer with 5+ years of experience building modern web applications. I
              specialize in creating responsive, accessible, and performant user interfaces with React and Next.js.
            </p>

            <p className="text-muted-foreground text-gray-400">
              My journey in web development started when I built my first website at 16. Since then, I&apos;ve worked with
              startups and established companies to deliver exceptional digital experiences.
            </p>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300 text-sm py-1.5 text-white "
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
