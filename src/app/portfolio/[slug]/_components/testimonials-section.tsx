"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import type { PortfolioData } from "../_lib/types"

interface TestimonialsSectionProps {
  data: PortfolioData
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { testimonials, profile, user } = data

  if (testimonials.length === 0) return null

  const renderStars = (rating: number | null) => {
    if (!rating) return null

    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
          />
        ))}
      </div>
    )
  }

  const profileImageSrc = profile?.profilePicture || user.profileImage || "/placeholder.svg?height=80&width=80"

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What People Say</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Testimonials from colleagues and clients I&apos;ve had the pleasure to work with
          </p>
        </motion.div>

        {/* Featured testimonial with profile picture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-purple-600/5" />

            {/* Profile picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-lg"
            >
              <Image
                src={profileImageSrc || "/placeholder.svg"}
                alt={profile?.fullName || user.name || "Profile"}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.div>

            <Quote className="text-blue-600/20 dark:text-blue-400/20 mx-auto mb-4" size={48} />

            {testimonials[0] && (
              <>
                <blockquote className="text-xl text-gray-800 dark:text-gray-200 italic mb-6 relative z-10">
                  &quot;{testimonials[0].message}&quot;
                </blockquote>

                <div className="flex items-center justify-center space-x-4 relative z-10">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonials[0].fromName}</p>
                    {testimonials[0].fromRole && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[0].fromRole}</p>
                    )}
                  </div>
                  {testimonials[0].rating && (
                    <div className="flex flex-col items-center">
                      {renderStars(testimonials[0].rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{testimonials[0].rating}/5</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Other testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 text-blue-200 dark:text-blue-700" size={32} />

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">
                  &quot;{testimonial.message}&quot;
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.fromName}</h4>
                  {testimonial.fromRole && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.fromRole}</p>
                  )}
                  {testimonial.relationship && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{testimonial.relationship}</p>
                  )}
                </div>

                {testimonial.rating && (
                  <div className="flex flex-col items-end">
                    {renderStars(testimonial.rating)}
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{testimonial.rating}/5</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
