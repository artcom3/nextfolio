"use client"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Play, Sparkles, Layout, BarChart3, Code2, CheckCircle, Star, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const templatesRef = useRef(null)
  const socialProofRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const templatesInView = useInView(templatesRef, { once: true, margin: "-100px" })
  const socialProofInView = useInView(socialProofRef, { once: true, margin: "-100px" })

  const testimonials = [
    {
      text: "NextFolio transformed how I showcase my projects. The AI content assistant helped me write better descriptions, and the analytics show me exactly who's viewing my work.",
      name: "Sarah Chen",
      role: "Full-stack Developer",
    },
    {
      text: "As a designer, I needed something that would make my work stand out. NextFolio's templates are gorgeous and the customization options are endless.",
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - keep existing */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/nextfolio-logo.png" alt="NextFolio" width={160} height={42} className="h-10 w-auto" />
            </div>
            <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-8">
              <div className="flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Templates
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </a>
                <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Docs
                </a>
                <a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </div>
            </div>
            <Button className="bg-[#5D5FEC] hover:bg-[#4B4DD8] text-white">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Animated Hero Section */}
      <section ref={heroRef} className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Turn your work into a living, <span className="text-[#5D5FEC]">AI-powered portfolio</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Build stunning, data-driven portfolios that showcase your work and grow your audience—no code required.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-[#5D5FEC] hover:bg-[#4B4DD8] text-white px-8 py-4 text-lg">
                Start for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Watch 60-sec demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Dashboard Mockup with Parallax */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            variants={itemVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            whileHover={{
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="bg-gray-900 rounded-t-xl p-3">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gray-100 rounded h-1 mb-3"></div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-xl p-8 shadow-2xl">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <Image
                  src="/placeholder.svg?height=600&width=1000"
                  alt="NextFolio Dashboard"
                  width={1000}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem → Solution Strip - keep existing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">The old way is broken</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Static portfolios that never get updated</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>No analytics or visitor insights</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Manual updates for every project</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Generic templates that look like everyone else's</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">NextFolio changes everything</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#5D5FEC]" />
                  <span>AI-powered content that stays fresh</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#5D5FEC]" />
                  <span>Real-time analytics and visitor tracking</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#5D5FEC]" />
                  <span>Automatic updates from your work platforms</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#5D5FEC]" />
                  <span>Unique, customizable templates that stand out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Key Features Grid */}
      <section ref={featuresRef} id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to shine
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              Powerful features that make portfolio building effortless
            </motion.p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {[
              {
                icon: Sparkles,
                title: "AI Content Assistant",
                description: "Generate compelling project descriptions and optimize your content automatically.",
              },
              {
                icon: Layout,
                title: "Drag-and-drop Templates",
                description: "Choose from beautiful, responsive templates and customize them to match your style.",
              },
              {
                icon: BarChart3,
                title: "Real-time Traffic Analytics",
                description: "Track visitors, engagement, and portfolio performance with detailed insights.",
              },
              {
                icon: Code2,
                title: "JSON API & Headless Mode",
                description: "Access your portfolio data programmatically or integrate with existing websites.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-0">
                    <motion.div
                      className="w-12 h-12 bg-[#5D5FEC]/10 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-6 h-6 text-[#5D5FEC]" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works - keep existing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Get your portfolio live in minutes, not hours</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5D5FEC] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Template</h3>
              <p className="text-gray-600">
                Pick from our curated collection of professional portfolio templates designed for different industries.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5D5FEC] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Work</h3>
              <p className="text-gray-600">
                Link your GitHub, Dribbble, Behance, or other platforms to automatically sync your latest projects.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5D5FEC] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Launch & Grow</h3>
              <p className="text-gray-600">
                Publish your portfolio with a custom domain and watch your audience grow with built-in analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Templates Showcase */}
      <section ref={templatesRef} id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={templatesInView ? "visible" : "hidden"}
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Beautiful templates for every field
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              Start with a template that matches your profession
            </motion.p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={templatesInView ? "visible" : "hidden"}
          >
            {[
              { name: "Developer", image: "/placeholder.svg?height=400&width=300" },
              { name: "Designer", image: "/placeholder.svg?height=400&width=300" },
              { name: "Photographer", image: "/placeholder.svg?height=400&width=300" },
            ].map((template, index) => (
              <motion.div key={index} className="group cursor-pointer" variants={cardVariants}>
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={`${template.name} Template`}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  ></motion.div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/90 text-gray-900">{template.name}</Badge>
                  </div>
                </motion.div>
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    Preview Template
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated Social Proof with Testimonial Slider */}
      <section ref={socialProofRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={socialProofInView ? "visible" : "hidden"}
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by creators worldwide
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              Join thousands of professionals showcasing their work
            </motion.p>
          </motion.div>

          {/* University/Community Logos */}
          <motion.div
            className="flex justify-center items-center space-x-12 mb-16 opacity-60"
            variants={containerVariants}
            initial="hidden"
            animate={socialProofInView ? "visible" : "hidden"}
          >
            {["GDSC", "Ensign College", "Dev Community", "CodePath"].map((logo, index) => (
              <motion.div key={index} variants={itemVariants} className="text-2xl font-bold text-gray-400">
                {logo}
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Testimonial Slider */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="p-8 text-center">
                  <CardContent className="p-0">
                    <div className="flex justify-center items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">"{testimonials[currentTestimonial].text}"</p>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                        <div className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-[#5D5FEC]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser - keep existing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-2">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  $0<span className="text-lg font-normal text-gray-600">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 portfolio</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>NextFolio subdomain</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
            <Card className="p-8 border-2 border-[#5D5FEC] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#5D5FEC] text-white">Coming Soon</Badge>
              </div>
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  $12<span className="text-lg font-normal text-gray-600">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Unlimited portfolios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Premium templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Custom domain</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>AI content assistant</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#5D5FEC] hover:bg-[#4B4DD8]" disabled>
                  Pro Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Animated CTA Banner */}
      <motion.section
        className="py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(-45deg, #5D5FEC, #4B4DD8, #6366F1, #5D5FEC)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join the early-access list
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Be the first to know when new features launch
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-[#5D5FEC] hover:bg-gray-100">Join Waitlist</Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - keep existing */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image
                src="/nextfolio-logo.png"
                alt="NextFolio"
                width={120}
                height={32}
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400">
                Build AI-enhanced portfolios that showcase your work and grow your audience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">Crafted with Next.js & ShadCN. © 2024 NextFolio.</p>
            <div className="flex items-center space-x-4">
              <a href="mailto:hello@nextfolio.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
