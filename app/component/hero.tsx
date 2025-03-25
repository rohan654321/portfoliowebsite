"use client"

import { motion } from "framer-motion"
import { ArrowDown, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/app/component/particles-background"
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const roles = ["Full-Stack Developer", "React.js Enthusiast", "UI/UX Designer"]

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white text-black"
    >
      <ParticlesBackground />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
    <motion.h1
      className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <TypeAnimation
        sequence={[
          "Rohan Mondal", // Text to display
          1000, // Delay in ms before erasing
          "", // Erasing effect
          500, // Delay before retyping
          "Rohan Mondal", // Retyping
          1000,
        ]}
        wrapper="span"
        speed={50} // Typing speed
        repeat={Infinity} // Infinite loop
      />
    </motion.h1>

          <motion.div
            className="h-8 mt-4 text-xl md:text-2xl font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Button
              className="group bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-300"
              asChild
            >
              <a href="/Rohan_Mondal_Resume.pdf" download>
                <FileDown className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
        transition={{ delay: 1, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}

