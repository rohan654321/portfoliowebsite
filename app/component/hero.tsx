"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/app/component/particles-background"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  const ref = useRef(null)

  const roles = ["Full-Stack Developer", "React.js Enthusiast", "UI/UX Designer"]

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 text-black dark:text-white"
    >
      <ParticlesBackground />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <TypeAnimation
              sequence={["Rohan Mondal", 1000, "", 500, "Rohan Mondal", 1000]}
              wrapper="span"
              speed={50}
              repeat={10}
            />
          </motion.h1>

          <motion.div
            className="h-8 mt-4 text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {roles.map((role, index) => (
              <motion.span
                key={role}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  duration: 0.5,
                }}
              >
                {index > 0 && <span className="mx-2">•</span>}
                {role}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              asChild
            >
              <a href="/Rohan_Mondal_Resume.pdf" download>
                <FileDown className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
          repeat: 3,
          repeatType: "reverse",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}

