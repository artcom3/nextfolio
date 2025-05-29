"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Award, GraduationCap, Briefcase } from "lucide-react"
import type { PortfolioData } from "../_lib/types"

interface ExperienceSectionProps {
  data: PortfolioData
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { experiences, educations, achievements } = data

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const calculateDuration = (startDate: Date, endDate: Date | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`
    } else {
      return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
    }
  }

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
              <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Professional Experience
            </h3>

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-700 last:border-l-0"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>

                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{experience.role}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        {experience.endDate ? "Former" : "Current"}
                      </span>
                    </div>

                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">{experience.company}</p>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(experience.startDate)} -{" "}
                      {experience.endDate ? formatDate(experience.endDate) : "Present"}
                      <span className="mx-2">•</span>
                      {calculateDuration(experience.startDate, experience.endDate)}
                    </div>

                    {experience.description && (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{experience.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-12"
          >
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <GraduationCap className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
                Education
              </h3>

              <div className="space-y-6">
                {educations.map((education, index) => (
                  <motion.div
                    key={education.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{education.degree}</h4>
                    <p className="text-lg text-blue-600 font-medium mb-2">{education.institution}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(education.startDate)} -{" "}
                      {education.endDate ? formatDate(education.endDate) : "Present"}
                    </div>

                    {education.description && <p className="text-gray-700 leading-relaxed">{education.description}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                  <Award className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
                  Achievements
                </h3>

                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{achievement.title}</h4>
                        {achievement.link && (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-sm"
                          >
                            View
                          </a>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar size={16} className="mr-1" />
                        {formatDate(achievement.date)}
                      </div>

                      {achievement.description && (
                        <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
