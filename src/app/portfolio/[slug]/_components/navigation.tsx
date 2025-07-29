"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import ThemeToggle from "./theme-toggle"
import { animationConfig } from "../_lib/animation-config"
import type { PortfolioData } from "../_lib/types"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

interface NavigationProps {
  data: PortfolioData
}

export default function Navigation({ data }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const { profile, user } = data

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const profileImageSrc = profile?.profilePicture || user.profileImage || "/placeholder.svg?height=40&width=40"

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.smooth,
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with profile picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: animationConfig.duration.normal,
              delay: 0.2,
              ease: animationConfig.easing.spring,
            }}
            className="flex items-center space-x-3"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-600/20 dark:ring-blue-400/20">
              <Image
                src={profileImageSrc || "/placeholder.svg"}
                alt={profile?.fullName || user.name || "Profile"}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              {profile?.fullName
                ?.split(" ")
                .map((name) => name[0])
                .join("") || "AJ"}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: animationConfig.duration.normal,
              delay: 0.3,
            }}
            className="hidden md:flex items-center space-x-8"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: animationConfig.duration.normal,
                  delay: 0.4 + index * animationConfig.stagger.fast,
                  ease: animationConfig.easing.smooth,
                }}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-all duration-300 ease-out ${
                  activeSection === item.href.substring(1)
                    ? "text-blue-600 dark:text-blue-400 scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 0.7,
                ease: animationConfig.easing.spring,
              }}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 0.4,
                ease: animationConfig.easing.spring,
              }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 0.5,
                ease: animationConfig.easing.spring,
              }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: animationConfig.easing.smooth }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: animationConfig.duration.fast,
                ease: animationConfig.easing.smooth,
              }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <motion.div
                initial="initial"
                animate="animate"
                exit="initial"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: animationConfig.stagger.fast,
                    },
                  },
                }}
                className="px-2 pt-2 pb-3 space-y-1"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    variants={{
                      initial: { opacity: 0, x: -20 },
                      animate: { opacity: 1, x: 0 },
                    }}
                    transition={{
                      duration: animationConfig.duration.fast,
                      ease: animationConfig.easing.smooth,
                    }}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-all duration-200 ${
                      activeSection === item.href.substring(1)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
