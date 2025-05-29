"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Image from "next/image"
import type { PortfolioData } from "../_lib/types"

interface FooterProps {
  data: PortfolioData
}

export default function Footer({ data }: FooterProps) {
  const { user, profile } = data
  const currentYear = new Date().getFullYear()

  const profileImageSrc = profile?.profilePicture || user.profileImage || "/placeholder.svg?height=60&width=60"

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8 flex flex-col items-center space-y-4">
            {/* Profile picture in footer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-gray-700"
            >
              <Image
                src={profileImageSrc || "/placeholder.svg"}
                alt={profile?.fullName || user.name || "Profile"}
                fill
                className="object-cover"
                sizes="64px"
              />
            </motion.div>

            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">{profile?.fullName || user.name}</h3>
              <p className="text-gray-400 dark:text-gray-500">{profile?.professionalTitle}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
            <p className="text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-2">
              <span>
                © {currentYear} {profile?.fullName || user.name}. Made with
              </span>
              <Heart className="text-red-500 fill-current" size={16} />
              <span>using Next.js and Framer Motion</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
