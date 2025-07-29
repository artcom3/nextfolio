"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Github, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import type { PortfolioData } from "../_lib/types"

interface ProjectsSectionProps {
  data: PortfolioData
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [filter, setFilter] = useState("all")

  const { projects } = data

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))]
  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
      case "in-progress":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
      case "planned":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    }
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) =>
            category ? (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === category
                    ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ) : null
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {project.images.length > 0 ? (
                  <Image
                    src={project.images[0].url || "/placeholder.svg"}
                    alt={project.images[0].caption || project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    <Tag size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <div className="flex space-x-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {project.category && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Tag size={16} className="mr-1" />
                    {project.category}
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                {project.tools.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool.id}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs font-medium"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium">
                          +{project.tools.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found for the selected category.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
