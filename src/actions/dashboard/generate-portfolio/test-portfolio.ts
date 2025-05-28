// Test file to verify the generate-portfolio function works correctly
// This file can be used for testing the complete workflow

import generatePortfolio from './generate-portfolio';

// Sample test data that mimics what the AI would generate
const testPortfolioData = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating innovative web solutions.",
    profileImage: "https://example.com/profile.jpg",
    profile: {
      fullName: "John Doe",
      professionalTitle: "Senior Full Stack Developer",
      bio: "Experienced developer with 5+ years in web development, specializing in React and Node.js.",
      location: "San Francisco, CA",
      pronouns: "he/him",
      funFact: "I once built a website in 24 hours during a hackathon!",
      motto: "Code with purpose, build with passion",
      profilePicture: "https://example.com/profile.jpg",
      phoneNumber: "+1-555-0123",
      socials: JSON.stringify({
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe"
      })
    },
    languages: [
      { name: "English", level: "native" },
      { name: "Spanish", level: "intermediate" },
      { name: "French", level: "beginner" }
    ],
    skills: [
      { name: "JavaScript", category: "programming_language" },
      { name: "React", category: "framework" },
      { name: "Node.js", category: "framework" },
      { name: "TypeScript", category: "programming_language" },
      { name: "Figma", category: "design_tool" },
      { name: "Communication", category: "other" }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        category: "development",
        description: "A full-stack e-commerce solution built with Next.js and PostgreSQL",
        link: "https://github.com/johndoe/ecommerce",
        status: "featured",
        images: [
          {
            url: "https://example.com/project1-image1.jpg",
            caption: "Homepage design"
          },
          {
            url: "https://example.com/project1-image2.jpg",
            caption: "Product listing page"
          }
        ],
        projectTools: [
          { name: "Next.js", category: "framework" },
          { name: "PostgreSQL", category: "other" },
          { name: "Tailwind CSS", category: "framework" }
        ]
      },
      {
        title: "Task Management App",
        category: "development",
        description: "A collaborative task management application",
        link: "https://github.com/johndoe/taskmanager",
        status: "collaborative",
        images: [
          {
            url: "https://example.com/project2-image1.jpg",
            caption: "Dashboard view"
          }
        ],
        projectTools: [
          { name: "React", category: "framework" },
          { name: "Express.js", category: "framework" },
          { name: "MongoDB", category: "other" }
        ]
      }
    ],
    experiences: [
      {
        role: "Senior Full Stack Developer",
        company: "Tech Innovators Inc.",
        description: "Led development of multiple web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
        startDate: "2022-01-15",
        endDate: "2024-12-31"
      },
      {
        role: "Full Stack Developer",
        company: "StartupXYZ",
        description: "Developed and maintained web applications using modern JavaScript frameworks.",
        startDate: "2020-06-01",
        endDate: "2021-12-31"
      },
      {
        role: "Junior Developer",
        company: "CodeCraft Solutions",
        description: "Learned full-stack development while contributing to client projects.",
        startDate: "2019-03-01",
        endDate: "2020-05-31"
      }
    ],
    educations: [
      {
        type: "degree",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        startDate: "2015-09-01",
        endDate: "2019-05-15",
        description: "Focused on software engineering and web technologies"
      },
      {
        type: "certification",
        degree: "AWS Certified Developer",
        institution: "Amazon Web Services",
        startDate: "2021-03-01",
        endDate: "2021-03-15",
        description: "Certification in cloud development and deployment"
      },
      {
        type: "course",
        degree: "Advanced React Development",
        institution: "Frontend Masters",
        startDate: "2020-11-01",
        endDate: "2020-12-01",
        description: "Intensive course on advanced React patterns and performance optimization"
      }
    ],
    achievements: [
      {
        title: "Hackathon Winner",
        description: "Won first place in the Annual Tech Hackathon for innovative web application",
        date: "2023-10-15",
        link: "https://example.com/hackathon-certificate"
      },
      {
        title: "Open Source Contributor",
        description: "Made significant contributions to popular React libraries",
        date: "2022-08-20"
      },
      {
        title: "Team Lead of the Year",
        description: "Recognized for exceptional leadership and project delivery",
        date: "2024-01-10"
      }
    ],
    testimonials: [
      {
        fromName: "Sarah Johnson",
        fromRole: "Product Manager",
        relationship: "Former colleague",
        message: "John is an exceptional developer who consistently delivers high-quality code and is always willing to help team members.",
        rating: 5
      },
      {
        fromName: "Mike Chen",
        fromRole: "Senior Developer",
        relationship: "Mentor",
        message: "I mentored John early in his career and watched him grow into an outstanding full-stack developer. His problem-solving skills are remarkable.",
        rating: 5
      },
      {
        fromName: "Emily Rodriguez",
        fromRole: "UI/UX Designer",
        relationship: "Collaborator",
        message: "Working with John was a pleasure. He understands the importance of user experience and implements designs perfectly.",
        rating: 4
      }
    ]
  }
};

// Export the test data for use in other files
export { testPortfolioData };

// Example function to run the test (commented out to avoid accidental execution)
export async function runPortfolioTest() {
  try {
    console.log("Starting portfolio generation test...");
    const result = await generatePortfolio(testPortfolioData);
    console.log("Portfolio generation successful:", result);
    return result;
  } catch (error) {
    console.error("Portfolio generation failed:", error);
    throw error;
  }
}

// Usage instructions:
// 1. Make sure you're authenticated (logged in)
// 2. Import and call runPortfolioTest() to test the complete workflow
// 3. Check the database to verify all data was saved correctly
//
// Example usage in a API route or server component:
// import { runPortfolioTest } from '@/actions/dashboard/generate-portfolio/test-portfolio';
// const result = await runPortfolioTest();
