"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, ArrowRight } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }


  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
            My <span className="text-indigo-400">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">My professional journey and projects I&apos;ve worked on</p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            className="relative pl-8 sm:pl-32 py-6 group"
          >
            {/* Timeline line */}
            <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/20 group-last:h-1/2"></div>

            {/* Timeline dot */}
            <div className="absolute left-0 sm:left-0 w-8 h-8 rounded-full bg-indigo-900 border-2 border-indigo-500 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-indigo-400" />
            </div>

            {/* Content */}
            <div className="sm:ml-8">
              <motion.div variants={leftVariant}>
                <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">Maxpo Exhibitions Pvt Ltd</h3>
                        <p className="text-indigo-400 font-medium">Web Development Intern</p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0 text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">3 Months</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">
                      Worked on multiple web development projects, focusing on frontend development, responsive design,
                      and implementing modern UI/UX practices.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">CRM Project</h4>
                          <p className="text-gray-300 text-sm">
                            Developed a customer relationship management system with user authentication, dashboard
                            analytics, and client management features.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Maxpo Official Business Website</h4>
                          <p className="text-gray-300 text-sm">
                            Built and deployed the company&apos;s official website with responsive design, event showcase,
                            and contact forms.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Global Fintech Website</h4>
                          <p className="text-gray-300 text-sm">
                            Contributed to the development of a fintech platform with interactive features and secure
                            payment integration.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">React</Badge>
                      <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">Next.js</Badge>
                      <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">Tailwind CSS</Badge>
                      <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">Node.js</Badge>
                      <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">MongoDB</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

