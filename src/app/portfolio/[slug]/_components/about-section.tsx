"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import type { PortfolioData } from "../_lib/types"
import { animationConfig } from "../_lib/animation-config"

interface AboutSectionProps {
  data: PortfolioData
}

export default function AboutSection({ data }: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { profile, profileSummary, metadata, user } = data

  const stats = [
    { label: "Projects Completed", value: metadata.totalProjects },
    { label: "Years Experience", value: "5+" },
    { label: "Technologies", value: metadata.totalSkills },
    { label: "Achievements", value: metadata.totalAchievements },
  ]

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: animationConfig.duration.normal,
        staggerChildren: animationConfig.stagger.normal,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.smooth,
      },
    },
  }

  const profileImageSrc = profile?.profilePicture || user.profileImage || "/placeholder.svg?height=300&width=300"

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: animationConfig.duration.slow,
            ease: animationConfig.easing.smooth,
          }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: animationConfig.duration.normal,
              ease: animationConfig.easing.smooth,
            }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{
              duration: animationConfig.duration.slow,
              delay: 0.2,
              ease: animationConfig.easing.smooth,
            }}
            className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: animationConfig.duration.slow,
              ease: animationConfig.easing.smooth,
            }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: animationConfig.easing.smooth }}
                className="relative w-64 h-64 sm:w-72 sm:h-72"
              >
                {/* Profile image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl ring-4 ring-gray-100 dark:ring-gray-800">
                  <Image
                    src={profileImageSrc || "/placeholder.svg"}
                    alt={profile?.fullName || user.name || "Profile Picture"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
                </div>

                {/* Decorative elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-3xl blur-xl"
                />
              </motion.div>

              {/* Professional badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: animationConfig.duration.normal,
                  delay: 0.5,
                  ease: animationConfig.easing.spring,
                }}
                className="absolute -bottom-4 -right-4 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                Available for work
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{profile?.professionalTitle}</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {profileSummary?.summary || profile?.bio}
              </p>
            </motion.div>

            {profile?.motto && (
              <motion.blockquote
                variants={itemVariants}
                className="border-l-4 border-blue-600 dark:border-blue-400 pl-6 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg"
              >
                <p className="text-lg italic text-gray-800 dark:text-gray-200">&quot;{profile.motto}&quot;</p>
              </motion.blockquote>
            )}

            {profile?.funFact && (
              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fun Fact</h4>
                <p className="text-gray-700 dark:text-gray-300">{profile.funFact}</p>
              </motion.div>
            )}

            {/* Languages */}
            {profile?.languages && profile.languages.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Languages</h4>
                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: {
                        staggerChildren: animationConfig.stagger.fast,
                      },
                    },
                  }}
                  className="flex flex-wrap gap-3"
                >
                  {profile.languages.map((language) => (
                    <motion.span
                      key={language.id}
                      variants={{
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {language.name} ({language.level})
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Stats Grid */}
            <motion.div
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: {
                    duration: animationConfig.duration.normal,
                    staggerChildren: animationConfig.stagger.normal,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    initial: { opacity: 0, y: 30, scale: 0.9 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: animationConfig.duration.slow,
                        ease: animationConfig.easing.spring,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2, ease: animationConfig.easing.smooth },
                  }}
                  className="text-center p-4 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: animationConfig.duration.normal,
                      delay: 0.4 + index * animationConfig.stagger.fast,
                      ease: animationConfig.easing.spring,
                    }}
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-700 dark:text-gray-300 font-medium text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
