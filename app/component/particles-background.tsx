"use client"

import { useCallback, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

// Optimized particles background with reduced particle count and simplified animation
export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle settings - reduced count for better performance
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20))
    const particles: { x: number; y: number; radius: number; speedX: number; speedY: number }[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate)

      // Clear canvas with slight trail effect for smoother appearance
      ctx.fillStyle = isDark ? "rgba(3, 7, 18, 0.05)" : "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles) {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(37, 99, 235, 0.3)"
        ctx.fill()
      }

      // Draw connections (reduced for performance)
      const connectionDistance = 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j += 2) {
          // Skip every other particle for connections
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${0.1 * (1 - distance / connectionDistance)})`
              : `rgba(37, 99, 235, ${0.1 * (1 - distance / connectionDistance)})`
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [isDark])

  useEffect(() => {
    drawParticles()
  }, [drawParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, #030712, #111827)"
          : "linear-gradient(to bottom, #ffffff, #f3f4f6)",
      }}
    />
  )
}

