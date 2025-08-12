"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, type ComponentType } from "react"
import { Code2, Wrench, Layers, Palette } from "lucide-react"
import type { PortfolioData, Skill as PortfolioSkill } from "../_lib/types"
import { animationConfig } from "../_lib/animation-config"

interface SkillsSectionProps {
  data: PortfolioData
}

const colorVariants = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-700",
    icon: "text-blue-600 dark:text-blue-400",
    accent: "bg-blue-600 dark:bg-blue-500",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-700",
    icon: "text-green-600 dark:text-green-400",
    accent: "bg-green-600 dark:bg-green-500",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-700",
    icon: "text-purple-600 dark:text-purple-400",
    accent: "bg-purple-600 dark:bg-purple-500",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-700",
    icon: "text-orange-600 dark:text-orange-400",
    accent: "bg-orange-600 dark:bg-orange-500",
  },
  gray: {
    bg: "bg-gray-50 dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-600",
    icon: "text-gray-600 dark:text-gray-400",
    accent: "bg-gray-600 dark:bg-gray-500",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-700",
    icon: "text-indigo-600 dark:text-indigo-400",
    accent: "bg-indigo-600 dark:bg-indigo-500",
  },
}

// Map schema categories to icons/colors/labels
const categoryConfig: Record<string, { label: string; color: keyof typeof colorVariants; icon: ComponentType<{ className?: string; size?: number }> }> = {
  PROGRAMMING_LANGUAGE: { label: "Programming Languages", color: "blue", icon: Code2 },
  FRAMEWORK: { label: "Frameworks", color: "green", icon: Layers },
  DESIGN_TOOL: { label: "Design Tools", color: "purple", icon: Palette },
  OTHER: { label: "Other", color: "gray", icon: Wrench },
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeView, setActiveView] = useState<"categories" | "cloud" | "list">("categories")

  const allSkills: PortfolioSkill[] = (data?.skills ?? []).slice().sort((a, b) => a.name.localeCompare(b.name))
  const skillsByCategory: Record<string, PortfolioSkill[]> = data?.metadata?.skillsByCategory ?? allSkills.reduce(
    (acc, skill) => {
      const key = skill.category ?? "OTHER"
      if (!acc[key]) acc[key] = []
      acc[key].push(skill)
      return acc
    },
    {} as Record<string, PortfolioSkill[]>
  )

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

  const categoryVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationConfig.duration.slow,
        
      },
    },
  }

  const skillVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: animationConfig.duration.normal,
        
      },
    },
  }

  const SkillTag = ({ skill }: { skill: PortfolioSkill }) => {
    return (
      <motion.div
        variants={skillVariants}
        whileHover={{
          scale: 1.05,
          y: -2,
          transition: { duration: 0.2 },
        }}
        className="group relative"
      >
        <div
          className={`
          bg-gray-50 dark:bg-gray-800 
          border-2 border-transparent 
          rounded-xl p-4 
          hover:border-blue-200 dark:hover:border-blue-700 
          transition-all duration-200 
          cursor-default
          shadow-sm hover:shadow-md
        `}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`font-semibold text-gray-900 dark:text-white`}>{skill.name}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {skill.category?.replace(/_/g, " ")}
          </div>
        </div>
      </motion.div>
    )
  }

  const SkillCloud = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <motion.div
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="contents"
        >
          {allSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={{
                initial: { opacity: 0, scale: 0.5 },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                  },
                },
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              className={`
                bg-gray-100 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100
                text-base px-4 py-2
                rounded-full 
                font-medium 
                cursor-default 
                hover:shadow-lg 
                transition-all duration-200
                border border-gray-200 dark:border-gray-700
                relative
                group
              `}
            >
              {skill.name}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {skill.category?.replace(/_/g, " ")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  const SkillList = () => {
    const categoryEntries = Object.entries(skillsByCategory)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categoryEntries.map(([category, skills], idx) => {
          const cfg = categoryConfig[category] ?? { label: category.replace(/_/g, " "), color: "gray" as const, icon: Wrench }
          const colors = colorVariants[cfg.color]
          const Icon = cfg.icon
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: idx * 0.1,
              }}
              className={`${colors.bg} rounded-xl p-6 border ${colors.border}`}
            >
              <div className="flex items-center mb-4">
                <Icon className={`${colors.icon} mr-3`} size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{cfg.label}</h3>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{skills.length} skills</span>
              </div>

              <div className="space-y-2">
                {skills
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 + 0.05 }}
                      className="flex items-center justify-between py-2 px-3 bg-white dark:bg-gray-800 rounded-lg"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: animationConfig.duration.slow,
            
          }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: animationConfig.duration.normal,
              
            }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{
              duration: animationConfig.duration.slow,
              delay: 0.2,
              
            }}
            className="h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: animationConfig.duration.normal,
              delay: 0.3,
              
            }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A comprehensive overview of my technical expertise and professional capabilities
          </motion.p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: animationConfig.duration.normal,
            delay: 0.4,
            
          }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveView("categories")}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                activeView === "categories"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveView("cloud")}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                activeView === "cloud"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Skill Cloud
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                activeView === "list"
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              By Category
            </button>
          </div>
        </motion.div>

        {/* Categories View */}
        {activeView === "categories" && (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="space-y-8"
          >
            {Object.entries(skillsByCategory).map(([categoryKey, skills]) => {
              const cfg = categoryConfig[categoryKey] ?? { label: categoryKey.replace(/_/g, " "), color: "gray" as const, icon: Wrench }
              const colors = colorVariants[cfg.color]
              const IconComponent = cfg.icon

              return (
                <motion.div
                  key={categoryKey}
                  variants={categoryVariants}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{
                      duration: animationConfig.duration.normal,
                    }}
                    className="flex items-start mb-8"
                  >
                    <div className={`p-4 rounded-xl ${colors.bg} mr-6 flex-shrink-0`}>
                      <IconComponent className={`${colors.icon}`} size={28} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{cfg.label}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Skills categorized from your profile</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{skills.length} technologies</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: {
                          staggerChildren: animationConfig.stagger.fast,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {skills
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((skill) => (
                        <SkillTag key={skill.id} skill={skill} />
                      ))}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Skill Cloud View */}
        {activeView === "cloud" && <SkillCloud />}

        {/* Skills by Level View */}
        {activeView === "list" && <SkillList />}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: animationConfig.duration.slow,
            delay: 0.8,
            
          }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 0.9,
                
              }}
            >
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {allSkills.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Total Skills</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 1.0,
                
              }}
            >
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {Object.keys(skillsByCategory).length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Categories</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 1.1,
                
              }}
            >
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {data.projects.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Projects</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: 1.2,
                
              }}
            >
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {Array.from(
                  new Set(
                    data.projects.flatMap((p) => (p.tools ?? []).map((s) => s.id))
                  )
                ).length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Tools Used in Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
