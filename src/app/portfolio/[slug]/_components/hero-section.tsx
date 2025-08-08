"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import type { PortfolioData } from "../_lib/types"
import { animationConfig } from "../_lib/animation-config"

interface HeroSectionProps {
  data: PortfolioData
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { profile, user } = data

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: animationConfig.duration.normal,
        staggerChildren: animationConfig.stagger.normal,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  const profileImageSrc = profile?.profilePicture || user.profileImage || "/placeholder.svg?height=400&width=400"

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-8">
            <motion.div 
              variants={itemVariants} 
              transition={{
                duration: animationConfig.duration.slow,
              }}
              className="space-y-4">
              <motion.p className="text-lg text-blue-600 dark:text-blue-400 font-medium">Hello, I&apos;m</motion.p>

              <motion.h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {profile?.fullName || user.name}
              </motion.h1>

              <motion.h2 className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                {profile?.professionalTitle}
              </motion.h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              transition={{
                duration: animationConfig.duration.slow,
              }}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              {profile?.bio || user.bio}
            </motion.p>

            {profile?.location && (
              <motion.div 
                variants={itemVariants} 
                transition={{
                  duration: animationConfig.duration.slow,
                }}
                className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin size={20} className="mr-2" />
                <span>{profile.location}</span>
              </motion.div>
            )}

            {/* Social Links */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: animationConfig.duration.normal,
                    staggerChildren: animationConfig.stagger.fast,
                  },
                },
              }}
              className="flex space-x-6"
            >
              {profile?.socials?.github && (
                <motion.a
                  variants={{
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Github size={24} />
                </motion.a>
              )}
              {profile?.socials?.linkedin && (
                <motion.a
                  variants={{
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Linkedin size={24} />
                </motion.a>
              )}
              {user.email && (
                <motion.a
                  variants={{
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${user.email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Mail size={24} />
                </motion.a>
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: animationConfig.duration.normal,
                    staggerChildren: animationConfig.stagger.fast,
                  },
                },
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToAbout}
                className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Learn More
              </motion.button>
              <motion.a
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-center shadow-md hover:shadow-lg"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: animationConfig.duration.slower,
              delay: 0.4,
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative background elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-full blur-xl"
              />

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Main profile image container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                >
                  {/* Profile image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800 ring-opacity-50">
                    <Image
                      src={profileImageSrc || "/placeholder.svg"}
                      alt={profile?.fullName || user.name || "Profile Picture"}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10" />
                  </div>

                  {/* Decorative ring */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-600/30 dark:border-blue-400/30"
                  />

                  {/* Status indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="w-full h-full bg-green-400 rounded-full"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: animationConfig.duration.normal,
            delay: 1.0,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
