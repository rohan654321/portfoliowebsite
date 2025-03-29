"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Github, Linkedin, Mail, Send, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    visible: boolean
    message: string
    type: "success" | "error"
  } | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  async function onSubmit(value: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      console.log("Submitting form data:", value)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })

      const data = await response.json()
      console.log("API Response:", data)

      if (!response.ok) throw new Error(data.error || "Failed to send message")

      reset() // Reset form after successful submission

      // Show thank you message
      setShowThankYou(true)

      // Show success notification
      setNotification({
        visible: true,
        message: "Message sent successfully! We'll get back to you soon.",
        type: "success",
      })

      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null)
      }, 5000)

      // Hide thank you message after 10 seconds
      setTimeout(() => {
        setShowThankYou(false)
      }, 10000)
    } catch (error) {
      console.error("Form submission error:", error)

      // Show error notification instead of alert
      setNotification({
        visible: true,
        message: "Something went wrong. Please try again.",
        type: "error",
      })

      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      {notification && notification.visible && (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-start pt-20 z-50">
          <div
            className={`${
              notification.type === "success" ? "bg-green-600 border-green-400" : "bg-red-600 border-red-400"
            } text-white p-4 rounded-md shadow-lg border max-w-md mx-4`}
          >
            <div className="flex items-center gap-3">
              {notification.type === "success" ? (
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
              ) : (
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-red-500 flex-shrink-0">
                  !
                </span>
              )}
              <p>{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-gray-400">
            Have a project in mind? Let&apos;s connect and bring your ideas to life!
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* ... (rest of your existing code remains the same) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            <Card className="h-full bg-blue-600/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                <p className="text-muted-foreground mb-6">I&apos;m open for freelance work and collaborations.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">contact@example.com</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 mt-auto">Connect</h3>
                <div className="flex gap-3">
                  {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="rounded-full border-primary/20 hover:bg-primary/20 hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            <Card className="bg-blue-600/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                {showThankYou ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="mb-4 rounded-full bg-green-500/20 p-4">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-4">
                      {notification?.message || "Your message has been sent successfully. We'll get back to you soon!"}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your name"
                        {...register("name")}
                        className="bg-slate-800/50 border-slate-700"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Input
                        placeholder="Your email"
                        {...register("email")}
                        className="bg-slate-800/50 border-slate-700"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Input
                        placeholder="Subject"
                        {...register("subject")}
                        className="bg-slate-800/50 border-slate-700"
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your message"
                        {...register("message")}
                        className="bg-slate-800/50 border-slate-700 min-h-[120px]"
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" /> Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

