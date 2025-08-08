"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code2, Database, Cloud, Wrench, Server, Brain, Star, Award, TrendingUp, Zap } from "lucide-react"
import type { PortfolioData } from "../_lib/types"
import { animationConfig } from "../_lib/animation-config"

interface SkillsSectionProps {
  data: PortfolioData
}

// Define proper skill type instead of using any
interface Skill {
  name: string
  level: "expert" | "advanced" | "intermediate" | "beginner"
  years: string
  trending: boolean
}

// Enhanced skill data with proficiency levels and visual indicators
const enhancedSkillsData = {
  "Frontend Development": {
    icon: Code2,
    color: "blue" as const,
    description: "Creating beautiful, responsive user interfaces",
    skills: [
      { name: "React", level: "expert" as const, years: "4+", trending: true },
      { name: "Next.js", level: "expert" as const, years: "3+", trending: true },
      { name: "TypeScript", level: "advanced" as const, years: "3+", trending: false },
      { name: "JavaScript", level: "expert" as const, years: "5+", trending: false },
      { name: "Tailwind CSS", level: "advanced" as const, years: "2+", trending: true },
      { name: "Framer Motion", level: "intermediate" as const, years: "1+", trending: true },
      { name: "HTML5", level: "expert" as const, years: "5+", trending: false },
      { name: "CSS3", level: "expert" as const, years: "5+", trending: false },
    ],
  },
  "Backend Development": {
    icon: Server,
    color: "green" as const,
    description: "Building scalable server-side applications",
    skills: [
      { name: "Node.js", level: "advanced" as const, years: "4+", trending: false },
      { name: "Express.js", level: "advanced" as const, years: "3+", trending: false },
      { name: "Python", level: "intermediate" as const, years: "2+", trending: false },
      { name: "REST APIs", level: "expert" as const, years: "4+", trending: false },
      { name: "GraphQL", level: "intermediate" as const, years: "1+", trending: true },
      { name: "Microservices", level: "intermediate" as const, years: "2+", trending: true },
    ],
  },
  "Database & Storage": {
    icon: Database,
    color: "purple" as const,
    description: "Managing data with modern database solutions",
    skills: [
      { name: "PostgreSQL", level: "advanced" as const, years: "3+", trending: false },
      { name: "MongoDB", level: "intermediate" as const, years: "2+", trending: false },
      { name: "Redis", level: "intermediate" as const, years: "1+", trending: false },
      { name: "Prisma", level: "advanced" as const, years: "2+", trending: true },
      { name: "Supabase", level: "intermediate" as const, years: "1+", trending: true },
    ],
  },
  "Cloud & DevOps": {
    icon: Cloud,
    color: "orange" as const,
    description: "Deploying and scaling applications in the cloud",
    skills: [
      { name: "AWS", level: "advanced" as const, years: "3+", trending: false },
      { name: "Vercel", level: "expert" as const, years: "2+", trending: true },
      { name: "Docker", level: "intermediate" as const, years: "2+", trending: false },
      { name: "GitHub Actions", level: "advanced" as const, years: "2+", trending: false },
      { name: "Terraform", level: "beginner" as const, years: "1+", trending: true },
    ],
  },
  "Tools & Workflow": {
    icon: Wrench,
    color: "gray" as const,
    description: "Optimizing development workflow and productivity",
    skills: [
      { name: "Git", level: "expert" as const, years: "5+", trending: false },
      { name: "VS Code", level: "expert" as const, years: "5+", trending: false },
      { name: "Figma", level: "intermediate" as const, years: "2+", trending: false },
      { name: "Jest", level: "intermediate" as const, years: "2+", trending: false },
      { name: "Postman", level: "advanced" as const, years: "3+", trending: false },
    ],
  },
  "Emerging Technologies": {
    icon: Brain,
    color: "indigo" as const,
    description: "Exploring cutting-edge technologies and trends",
    skills: [
      { name: "AI/ML Integration", level: "beginner" as const, years: "1+", trending: true },
      { name: "WebAssembly", level: "beginner" as const, years: "<1", trending: true },
      { name: "Web3", level: "beginner" as const, years: "<1", trending: true },
      { name: "Edge Computing", level: "beginner" as const, years: "1+", trending: true },
    ],
  },
}

const skillLevels = {
  expert: {
    icon: Award,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    label: "Expert",
    size: "text-lg",
  },
  advanced: {
    icon: Star,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    label: "Advanced",
    size: "text-base",
  },
  intermediate: {
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
    label: "Intermediate",
    size: "text-sm",
  },
  beginner: {
    icon: Zap,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    label: "Learning",
    size: "text-sm",
  },
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

export default function SkillsSection({ }: SkillsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeView, setActiveView] = useState<"categories" | "cloud" | "list">("categories")

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

  const SkillTag = ({ skill }: { skill: Skill }) => {
    const levelInfo = skillLevels[skill.level as keyof typeof skillLevels]
    const LevelIcon = levelInfo.icon

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
          ${levelInfo.bg} 
          border-2 border-transparent 
          rounded-xl p-4 
          hover:border-blue-200 dark:hover:border-blue-700 
          transition-all duration-200 
          cursor-default
          shadow-sm hover:shadow-md
        `}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`font-semibold text-gray-900 dark:text-white ${levelInfo.size}`}>{skill.name}</span>
            <div className="flex items-center space-x-1">
              {skill.trending && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
              )}
              <LevelIcon className={`${levelInfo.color}`} size={16} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className={`${levelInfo.color} font-medium`}>{levelInfo.label}</span>
            <span className="text-gray-500 dark:text-gray-400">{skill.years} exp</span>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            {skill.years} years experience • {levelInfo.label} level
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  const SkillCloud = () => {
    const allSkills = Object.values(enhancedSkillsData)
      .flatMap((category) => category.skills)
      .sort((a, b) => {
        const levelOrder = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 }
        return levelOrder[b.level as keyof typeof levelOrder] - levelOrder[a.level as keyof typeof levelOrder]
      })

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
          {allSkills.map((skill) => {
            const levelInfo = skillLevels[skill.level as keyof typeof skillLevels]
            const sizeClass =
              skill.level === "expert"
                ? "text-xl px-6 py-3"
                : skill.level === "advanced"
                  ? "text-lg px-5 py-2.5"
                  : skill.level === "intermediate"
                    ? "text-base px-4 py-2"
                    : "text-sm px-3 py-1.5"

            return (
              <motion.div
                key={skill.name}
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
                  ${levelInfo.bg} 
                  ${levelInfo.color}
                  ${sizeClass}
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
                {skill.trending && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  />
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {levelInfo.label} • {skill.years}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    )
  }

  const SkillList = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(skillLevels).map(([level, levelInfo]) => {
          const skillsInLevel = Object.values(enhancedSkillsData)
            .flatMap((category) => category.skills)
            .filter((skill) => skill.level === level)

          if (skillsInLevel.length === 0) return null

          const LevelIcon = levelInfo.icon

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: animationConfig.duration.normal,
                delay: Object.keys(skillLevels).indexOf(level) * 0.1,
              }}
              className={`${levelInfo.bg} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}
            >
              <div className="flex items-center mb-4">
                <LevelIcon className={`${levelInfo.color} mr-3`} size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{levelInfo.label}</h3>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{skillsInLevel.length} skills</span>
              </div>

              <div className="space-y-2">
                {skillsInLevel.map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: Object.keys(skillLevels).indexOf(level) * 0.1 + 0.05,
                    }}
                    className="flex items-center justify-between py-2 px-3 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      {skill.trending && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="w-2 h-2 bg-red-500 rounded-full"
                        />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.years}</span>
                    </div>
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
              By Level
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
            {Object.entries(enhancedSkillsData).map(([categoryName, categoryData]) => {
              const IconComponent = categoryData.icon
              const colors = colorVariants[categoryData.color as keyof typeof colorVariants]

              return (
                <motion.div
                  key={categoryName}
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
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{categoryName}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{categoryData.description}</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{categoryData.skills.length} technologies</span>
                        <span className="mx-2">•</span>
                        <span>{categoryData.skills.filter((s) => s.level === "expert").length} expert level</span>
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
                    {categoryData.skills.map((skill) => (
                      <SkillTag key={skill.name} skill={skill} />
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
                {Object.values(enhancedSkillsData).reduce((acc, cat) => acc + cat.skills.length, 0)}
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
                {
                  Object.values(enhancedSkillsData)
                    .flatMap((cat) => cat.skills)
                    .filter((skill) => skill.level === "expert").length
                }
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Expert Level</div>
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
                {Object.keys(enhancedSkillsData).length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Specializations</div>
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
                {
                  Object.values(enhancedSkillsData)
                    .flatMap((cat) => cat.skills)
                    .filter((skill) => skill.trending).length
                }
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Trending</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
