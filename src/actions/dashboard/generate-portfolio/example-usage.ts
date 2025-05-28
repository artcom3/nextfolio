// Example usage of generatePortfolio function
// This demonstrates how to use the function with AI-generated JSON data

import generatePortfolio from "./generate-portfolio";

// Example JSON structure that would come from your AI generation
const exampleAIGeneratedData = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate software developer with 5 years of experience",
    profileImage: "https://example.com/profile.jpg",
    profile: {
      fullName: "John Doe",
      professionalTitle: "Full Stack Developer",
      bio: "I'm a passionate software developer who loves creating innovative solutions and learning new technologies.",
      location: "San Francisco, CA",
      pronouns: "he/him",
      funFact: "I can solve a Rubik's cube in under 2 minutes!",
      motto: "Code with purpose, design with passion",
      profilePicture: "https://example.com/profile.jpg",
      phoneNumber: "+1 (555) 123-4567",
      socials: JSON.stringify({
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe"
      })
    },
    languages: [
      { name: "English", level: "NATIVE" },
      { name: "Spanish", level: "INTERMEDIATE" },
      { name: "French", level: "BEGINNER" }
    ],
    skills: [
      { name: "TypeScript", category: "PROGRAMMING_LANGUAGE" },
      { name: "React", category: "FRAMEWORK" },
      { name: "Node.js", category: "FRAMEWORK" },
      { name: "Figma", category: "DESIGN_TOOL" },
      { name: "PostgreSQL", category: "OTHER" }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        category: "DEVELOPMENT",
        description: "A full-stack e-commerce platform built with Next.js and PostgreSQL",
        link: "https://github.com/johndoe/ecommerce",
        status: "FEATURED",
        images: [
          {
            url: "https://example.com/project1-screenshot.jpg",
            caption: "Homepage design"
          },
          {
            url: "https://example.com/project1-dashboard.jpg",
            caption: "Admin dashboard"
          }
        ],
        projectTools: [
          { name: "Next.js", category: "FRAMEWORK" },
          { name: "PostgreSQL", category: "OTHER" },
          { name: "Tailwind CSS", category: "FRAMEWORK" }
        ]
      },
      {
        title: "Portfolio Website",
        category: "DEVELOPMENT",
        description: "Personal portfolio website showcasing my work and skills",
        link: "https://johndoe.dev",
        status: "IN_PROGRESS",
        images: [
          {
            url: "https://example.com/portfolio-home.jpg",
            caption: "Homepage"
          }
        ],
        projectTools: [
          { name: "React", category: "FRAMEWORK" },
          { name: "TypeScript", category: "PROGRAMMING_LANGUAGE" }
        ]
      }
    ],
    experiences: [
      {
        role: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        description: "Led development of scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
        startDate: "2022-01-15T00:00:00.000Z",
        endDate: "2024-12-31T00:00:00.000Z"
      },
      {
        role: "Frontend Developer",
        company: "Digital Solutions LLC",
        description: "Developed responsive web applications and improved user experience across multiple products.",
        startDate: "2020-06-01T00:00:00.000Z",
        endDate: "2021-12-31T00:00:00.000Z"
      }
    ],
    educations: [
      {
        type: "DEGREE",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        startDate: "2016-08-15T00:00:00.000Z",
        endDate: "2020-05-15T00:00:00.000Z",
        description: "Focused on software engineering and algorithms. Graduated Magna Cum Laude."
      },
      {
        type: "CERTIFICATION",
        degree: "AWS Certified Developer Associate",
        institution: "Amazon Web Services",
        startDate: "2023-03-01T00:00:00.000Z",
        description: "Certified in AWS cloud development and deployment practices."
      }
    ],
    achievements: [
      {
        title: "Employee of the Year 2023",
        description: "Recognized for outstanding performance and leadership in software development.",
        date: "2023-12-15T00:00:00.000Z"
      },
      {
        title: "Open Source Contributor",
        description: "Active contributor to popular React libraries with over 1000 GitHub stars.",
        link: "https://github.com/johndoe"
      }
    ],
    testimonials: [
      {
        fromName: "Sarah Johnson",
        fromRole: "Engineering Manager",
        relationship: "Direct Manager",
        message: "John is an exceptional developer who consistently delivers high-quality code and mentors team members effectively.",
        rating: 5
      },
      {
        fromName: "Mike Chen",
        fromRole: "Product Designer",
        relationship: "Colleague",
        message: "Working with John was a pleasure. He has great attention to detail and excellent communication skills.",
        rating: 5
      }
    ]
  }
};

// Example function to demonstrate usage
export async function exampleUsage() {
  try {
    const result = await generatePortfolio(exampleAIGeneratedData);
    console.log("Portfolio generation result:", result);
    return result;
  } catch (error) {
    console.error("Failed to generate portfolio:", error);
    throw error;
  }
}

// Example of integrating with your AI generation workflow
export async function generatePortfolioFromResume(resumeText: string) {
  try {
    // 1. First, generate content using your existing AI function
    const { generateContent } = await import("../../gemini/generate-content");
    const aiGeneratedData = await generateContent({ resumeText });
    
    // 2. Then, save the generated data to your database
    const result = await generatePortfolio(aiGeneratedData);
    
    console.log("Successfully generated and saved portfolio:", result);
    return result;
  } catch (error) {
    console.error("Error in portfolio generation workflow:", error);
    throw error;
  }
}

export default exampleUsage;
