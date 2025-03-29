"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useMobile } from "@/app/hooks/use-mobile"

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const { theme } = useTheme()
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(true)

  const isDark = theme === "dark"

  // Throttle function to limit how often the animation runs
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const throttle = (callback: Function, delay: number) => {
    let lastCall = 0
    return (...args: unknown[]) => {
      const now = new Date().getTime()
      if (now - lastCall < delay) {
        return
      }
      lastCall = now
      return callback(...args)
    }
  }

  // Optimize particle count based on device
  const getParticleCount = useCallback(() => {
    const width = window.innerWidth
    if (width < 640) return 30 // Mobile
    if (width < 1024) return 40 // Tablet
    return 60 // Desktop
  }, [])

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()

    // Throttled resize handler
    const handleResize = throttle(() => {
      setCanvasDimensions()
      // Recreate particles on resize
      initParticles()
    }, 200)

    window.addEventListener("resize", handleResize)

    // Visibility change handler to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Particle settings
    const particleCount = getParticleCount()
    let particles: { x: number; y: number; radius: number; speedX: number; speedY: number; opacity: number }[] = []

    // Initialize particles
    const initParticles = () => {
      particles = []
      const width = window.innerWidth
      const height = window.innerHeight

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * (isMobile ? 1.5 : 2) + 0.5
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    initParticles()

    // Animation function
    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const width = window.innerWidth
      const height = window.innerHeight

      // Clear canvas completely each frame for better performance
      ctx.fillStyle = isDark ? "#030712" : "#ffffff"
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      for (const particle of particles) {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `rgba(59, 130, 246, ${particle.opacity})`
          : `rgba(37, 99, 235, ${particle.opacity * 0.7})`
        ctx.fill()
      }

      // Draw connections with optimized algorithm
      // Only check connections for particles within a grid cell
      const connectionDistance = isMobile ? 100 : 150
      const gridSize = connectionDistance
      const grid: Record<string, number[]> = {}

      // Place particles in grid cells
      particles.forEach((particle, index) => {
        const cellX = Math.floor(particle.x / gridSize)
        const cellY = Math.floor(particle.y / gridSize)
        const cellKey = `${cellX},${cellY}`

        if (!grid[cellKey]) {
          grid[cellKey] = []
        }
        grid[cellKey].push(index)
      })

      // Check connections only within the same cell and adjacent cells
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        const cellX = Math.floor(particle.x / gridSize)
        const cellY = Math.floor(particle.y / gridSize)

        // Check surrounding cells
        for (let nx = cellX - 1; nx <= cellX + 1; nx++) {
          for (let ny = cellY - 1; ny <= cellY + 1; ny++) {
            const cellKey = `${nx},${ny}`
            if (!grid[cellKey]) continue

            // Check particles in this cell
            for (const j of grid[cellKey]) {
              if (i === j) continue // Skip self

              const dx = particle.x - particles[j].x
              const dy = particle.y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < connectionDistance) {
                const opacity = 0.15 * (1 - distance / connectionDistance)
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = isDark ? `rgba(59, 130, 246, ${opacity})` : `rgba(37, 99, 235, ${opacity * 0.7})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isDark, isVisible, isMobile, getParticleCount])

  useEffect(() => {
    drawParticles()
  }, [drawParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 transition-colors duration-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #030712 0%, #111827 50%, #1e3a8a 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #dbeafe 100%)",
      }}
    />
  )
}

