import type { PortfolioData } from "./types"

export const mockPortfolioData: PortfolioData = {
  user: {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Full-stack developer passionate about creating innovative solutions",
    profileImage: "/placeholder.svg?height=400&width=400",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  profile: {
    id: "1",
    fullName: "Alex Johnson",
    professionalTitle: "Senior Full-Stack Developer",
    bio: "Passionate developer with 5+ years of experience building scalable web applications and leading development teams.",
    location: "San Francisco, CA",
    pronouns: "they/them",
    funFact: "I can solve a Rubik's cube in under 2 minutes!",
    motto: "Code with purpose, design with empathy",
    profilePicture: "/placeholder.svg?height=400&width=400",
    phoneNumber: "+1 (555) 123-4567",
    socials: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      portfolio: "https://alexjohnson.dev",
    },
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
    languages: [
      {
        id: "1",
        name: "English",
        level: "Native",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        name: "Spanish",
        level: "Conversational",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
    ],
  },
  languages: [
    {
      id: "1",
      name: "English",
      level: "Native",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Spanish",
      level: "Conversational",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  skills: [
    {
      id: "1",
      name: "React",
      category: "Frontend",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Next.js",
      category: "Frontend",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "3",
      name: "Node.js",
      category: "Backend",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "4",
      name: "PostgreSQL",
      category: "Database",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "5",
      name: "AWS",
      category: "Cloud",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "6",
      name: "TypeScript",
      category: "Language",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      category: "Web Application",
      description:
        "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management, payment processing, and admin dashboard.",
      link: "https://github.com/alexjohnson/ecommerce-platform",
      status: "completed",
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2023-12-01"),
      images: [
        {
          id: "1",
          url: "/placeholder.svg?height=300&width=500",
          caption: "Homepage with product showcase",
          createdAt: new Date("2023-06-01"),
          updatedAt: new Date("2023-06-01"),
        },
      ],
      projectTools: [
        {
          skill: {
            id: "1",
            name: "React",
            category: "Frontend",
          },
        },
        {
          skill: {
            id: "2",
            name: "Next.js",
            category: "Frontend",
          },
        },
      ],
      tools: [
        {
          id: "1",
          name: "React",
          category: "Frontend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
        {
          id: "2",
          name: "Next.js",
          category: "Frontend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
    },
    {
      id: "2",
      title: "Task Management App",
      category: "Mobile Application",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and advanced analytics.",
      link: "https://github.com/alexjohnson/task-manager",
      status: "in-progress",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-03-01"),
      images: [
        {
          id: "2",
          url: "/placeholder.svg?height=300&width=500",
          caption: "Dashboard with task overview",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
      projectTools: [
        {
          skill: {
            id: "1",
            name: "React",
            category: "Frontend",
          },
        },
        {
          skill: {
            id: "3",
            name: "Node.js",
            category: "Backend",
          },
        },
      ],
      tools: [
        {
          id: "1",
          name: "React",
          category: "Frontend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
        {
          id: "3",
          name: "Node.js",
          category: "Backend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
    },
  ],
  experiences: [
    {
      id: "1",
      role: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      startDate: new Date("2022-01-01"),
      endDate: null,
      description:
        "Leading a team of 5 developers in building scalable web applications. Implemented microservices architecture that improved system performance by 40%.",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2021-12-31"),
      description:
        "Developed and maintained multiple client projects using React, Node.js, and AWS. Collaborated with design team to implement pixel-perfect UI components.",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  educations: [
    {
      id: "1",
      type: "Bachelor's Degree",
      degree: "Computer Science",
      institution: "University of California, Berkeley",
      startDate: new Date("2016-09-01"),
      endDate: new Date("2020-05-01"),
      description: "Graduated Magna Cum Laude with focus on software engineering and algorithms.",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  achievements: [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      description: "Professional level certification demonstrating expertise in designing distributed systems on AWS.",
      date: new Date("2023-08-15"),
      link: "https://aws.amazon.com/certification/",
      createdAt: new Date("2023-08-15"),
      updatedAt: new Date("2023-08-15"),
    },
    {
      id: "2",
      title: "Hackathon Winner - TechCrunch Disrupt",
      description: "First place winner for developing an AI-powered accessibility tool in 48 hours.",
      date: new Date("2023-05-20"),
      link: null,
      createdAt: new Date("2023-05-20"),
      updatedAt: new Date("2023-05-20"),
    },
  ],
  testimonials: [
    {
      id: "1",
      fromName: "Sarah Chen",
      fromRole: "Product Manager",
      relationship: "Colleague",
      message:
        "Alex is an exceptional developer who consistently delivers high-quality code. Their ability to translate complex requirements into elegant solutions is remarkable.",
      rating: 5,
      createdAt: new Date("2023-10-01"),
      updatedAt: new Date("2023-10-01"),
    },
    {
      id: "2",
      fromName: "Michael Rodriguez",
      fromRole: "CTO",
      relationship: "Manager",
      message:
        "Working with Alex has been a pleasure. They bring both technical expertise and strong leadership skills to every project.",
      rating: 5,
      createdAt: new Date("2023-11-15"),
      updatedAt: new Date("2023-11-15"),
    },
  ],
  profileSummary: {
    id: "1",
    summary:
      "Experienced full-stack developer with a passion for creating innovative, user-centric applications. Proven track record of leading development teams and delivering scalable solutions that drive business growth.",
    updatedAt: new Date("2024-01-01"),
  },
  metadata: {
    totalSkills: 6,
    totalProjects: 2,
    totalExperiences: 2,
    totalEducations: 1,
    totalAchievements: 2,
    totalTestimonials: 2,
    hasProfilePicture: true,
    hasContactInfo: true,
    hasProfile: true,
    hasSummary: true,
    lastUpdated: new Date("2024-01-01"),
    skillsByCategory: {
      Frontend: [
        {
          id: "1",
          name: "React",
          category: "Frontend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
        {
          id: "2",
          name: "Next.js",
          category: "Frontend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
      Backend: [
        {
          id: "3",
          name: "Node.js",
          category: "Backend",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
    },
    projectsByStatus: {
      completed: [
        {
          id: "1",
          title: "E-Commerce Platform",
          category: "Web Application",
          description:
            "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management, payment processing, and admin dashboard.",
          link: "https://github.com/alexjohnson/ecommerce-platform",
          status: "completed",
          createdAt: new Date("2023-06-01"),
          updatedAt: new Date("2023-12-01"),
          images: [
            {
              id: "1",
              url: "/placeholder.svg?height=300&width=500",
              caption: "Homepage with product showcase",
              createdAt: new Date("2023-06-01"),
              updatedAt: new Date("2023-06-01"),
            },
          ],
          projectTools: [
            {
              skill: {
                id: "1",
                name: "React",
                category: "Frontend",
              },
            },
          ],
          tools: [
            {
              id: "1",
              name: "React",
              category: "Frontend",
              createdAt: new Date("2023-01-01"),
              updatedAt: new Date("2024-01-01"),
            },
          ],
        },
      ],
    },
  },
}
