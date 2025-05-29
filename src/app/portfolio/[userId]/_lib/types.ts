export interface User {
  id: string
  name: string | null
  email: string | null
  bio: string | null
  profileImage: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Language {
  id: string
  name: string
  level: string
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  fullName: string | null
  professionalTitle: string | null
  bio: string | null
  location: string | null
  pronouns: string | null
  funFact: string | null
  motto: string | null
  profilePicture: string | null
  phoneNumber: string | null
  socials: Record<string, string> | null
  createdAt: Date
  updatedAt: Date
  languages: Language[]
}

export interface Skill {
  id: string
  name: string
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectImage {
  id: string
  url: string
  caption: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ProjectTool {
  skill: {
    id: string
    name: string
    category: string
  }
}

export interface Project {
  id: string
  title: string
  category: string | null
  description: string | null
  link: string | null
  status: string
  createdAt: Date
  updatedAt: Date
  images: ProjectImage[]
  projectTools: ProjectTool[]
  tools: Skill[]
}

export interface Experience {
  id: string
  role: string
  company: string
  startDate: Date
  endDate: Date | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Education {
  id: string
  type: string
  degree: string
  institution: string
  startDate: Date
  endDate: Date | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  title: string
  description: string | null
  date: Date
  link: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  fromName: string
  fromRole: string | null
  relationship: string | null
  message: string
  rating: number | null
  createdAt: Date
  updatedAt: Date
}

export interface ProfileSummary {
  id: string
  summary: string
  updatedAt: Date
}

export interface Metadata {
  totalSkills: number
  totalProjects: number
  totalExperiences: number
  totalEducations: number
  totalAchievements: number
  totalTestimonials: number
  hasProfilePicture: boolean
  hasContactInfo: boolean
  hasProfile: boolean
  hasSummary: boolean
  lastUpdated: Date
  skillsByCategory: Record<string, Skill[]>
  projectsByStatus: Record<string, Project[]>
}

export interface PortfolioData {
  user: User
  profile: Profile | null
  languages: Language[]
  skills: Skill[]
  projects: Project[]
  experiences: Experience[]
  educations: Education[]
  achievements: Achievement[]
  testimonials: Testimonial[]
  profileSummary: ProfileSummary | null
  metadata: Metadata
}
