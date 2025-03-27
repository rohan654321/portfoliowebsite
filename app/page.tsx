"use client"

import { useState, useEffect } from "react"
import Hero from "@/app/component/hero"
import About from "@/app/component/about"
import Projects from "@/app/component/project"
import Skills from "@/app/component/skills"
// import Experience from "@/app/component/experience"
import Contact from "@/app/component/contact"
import Footer from "@/app/component/footer"
import LoadingScreen from "@/app/component/loading-screen"
import Experience from "./component/experience"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set a timeout to simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen />
      <main
        className={`min-h-screen bg-background text-foreground transition-all duration-500 ${isLoading ? "blur-sm" : "blur-0"}`}
      >
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

