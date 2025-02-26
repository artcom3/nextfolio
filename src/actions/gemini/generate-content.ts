"use server";

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface Props {
  resumeText: string
}

export const generateContent = async ({ resumeText }: Props) => {

  const schema = {
    description: "Resume or portfolio data structure",
    type: SchemaType.OBJECT,
    properties: {
      user: {
        type: SchemaType.OBJECT,
        description: "User's personal information and related entities",
        properties: {
          name: { type: SchemaType.STRING, description: "Full name of the user", nullable: true },
          email: { type: SchemaType.STRING, description: "User's email address", nullable: false },
          // emailVerified: { type: SchemaType.STRING, format: "date-time", description: "Verification timestamp for email", nullable: true },
          image: { type: SchemaType.STRING, description: "URL of the user's profile image", nullable: true },
          password: { type: SchemaType.STRING, description: "User's password (hashed)", nullable: true },
          profile: {
            type: SchemaType.OBJECT,
            description: "User profile details",
            properties: {
              fullName: { type: SchemaType.STRING, description: "Full name of the user", nullable: false },
              professionalTitle: { type: SchemaType.STRING, description: "User's professional title", nullable: true },
              bio: { type: SchemaType.STRING, description: "Brief biography of the user", nullable: true },
              location: { type: SchemaType.STRING, description: "User's location", nullable: true },
              pronouns: { type: SchemaType.STRING, description: "User's pronouns", nullable: true },
              funFact: { type: SchemaType.STRING, description: "A fun fact about the user", nullable: true },
              motto: { type: SchemaType.STRING, description: "User's personal motto", nullable: true },
              profilePicture: { type: SchemaType.STRING, description: "URL of the user's profile picture", nullable: true },
              phoneNumber: { type: SchemaType.STRING, description: "User's phone number", nullable: true },
              // socials: {
              //   type: SchemaType.OBJECT,
              //   description: "Social media links",
              //   nullable: true,
              // },
              languages: {
                type: SchemaType.ARRAY,
                description: "Languages spoken by the user",
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    name: { type: SchemaType.STRING, description: "Language name", nullable: false },
                    level: { type: SchemaType.STRING, description: "Language proficiency level", enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "NATIVE"], nullable: false },
                  },
                  required: ["name", "level"],
                },
                nullable: true,
              },
            },
            required: ["fullName"],
          },
          skills: {
            type: SchemaType.ARRAY,
            description: "List of the user's skills",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING, description: "Skill name", nullable: false },
                type: { type: SchemaType.STRING, description: "Skill type", enum: ["TECHNICAL", "SOFT"], nullable: false },
                level: { type: SchemaType.STRING, description: "Proficiency level of the skill", nullable: true },
              },
              required: ["name", "type"],
            },
          },
          projects: {
            type: SchemaType.ARRAY,
            description: "List of the user's projects",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING, description: "Project name", nullable: false },
                description: { type: SchemaType.STRING, description: "Project description", nullable: true },
                technologies: {
                  type: SchemaType.ARRAY,
                  description: "Technologies used in the project",
                  items: { type: SchemaType.STRING },
                  nullable: true,
                },
                link: { type: SchemaType.STRING, description: "URL to the project", nullable: true },
                imageUrl: { type: SchemaType.STRING, description: "Image URL for the project", nullable: true },
                status: { type: SchemaType.STRING, description: "Project status", enum: ["FEATURED", "COLLABORATIVE", "IN_PROGRESS"], nullable: false },
                // metrics: { type: SchemaType.OBJECT, description: "Additional metrics related to the project", nullable: true },
              },
              required: ["name", "status"],
            },
          },
          experiences: {
            type: SchemaType.ARRAY,
            description: "List of the user's work experiences",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                jobTitle: { type: SchemaType.STRING, description: "Job title", nullable: false },
                company: { type: SchemaType.STRING, description: "Company name", nullable: false },
                // startDate: { type: SchemaType.STRING, format: "date-time", description: "Start date of the job", nullable: false },
                // endDate: { type: SchemaType.STRING, format: "date-time", description: "End date of the job", nullable: true },
                responsibilities: { type: SchemaType.STRING, description: "Job responsibilities", nullable: true },
                achievements: { type: SchemaType.STRING, description: "Achievements in the role", nullable: true },
                technologies: {
                  type: SchemaType.ARRAY,
                  description: "Technologies used in the job",
                  items: { type: SchemaType.STRING },
                  nullable: true,
                },
              },
              required: ["jobTitle", "company"],
            },
          },
          educations: {
            type: SchemaType.ARRAY,
            description: "List of the user's education history",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                type: { type: SchemaType.STRING, description: "Type of education", enum: ["DEGREE", "CERTIFICATION", "COURSE"], nullable: false },
                degree: { type: SchemaType.STRING, description: "Degree or certification name", nullable: false },
                institution: { type: SchemaType.STRING, description: "Institution name", nullable: false },
                // startDate: { type: SchemaType.STRING, format: "date-time", description: "Start date", nullable: false },
                // endDate: { type: SchemaType.STRING, format: "date-time", description: "End date", nullable: true },
                description: { type: SchemaType.STRING, description: "Additional details about the education", nullable: true },
              },
              required: ["type", "degree", "institution"],
            },
          },
          testimonials: {
            type: SchemaType.ARRAY,
            description: "List of testimonials for the user",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                fromName: { type: SchemaType.STRING, description: "Name of the person giving the testimonial", nullable: false },
                fromRole: { type: SchemaType.STRING, description: "Role of the person giving the testimonial", nullable: true },
                relationship: { type: SchemaType.STRING, description: "Relationship to the user", nullable: true },
                message: { type: SchemaType.STRING, description: "Testimonial message", nullable: false },
                rating: { type: SchemaType.INTEGER, description: "Rating given by the person", nullable: true },
              },
              required: ["fromName", "message"],
            },
          },
          achievements: {
            type: SchemaType.ARRAY,
            description: "List of achievements for the user",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING, description: "Name of the achievement", nullable: false },
                // date: { type: SchemaType.STRING, format: "date-time", description: "Date of the achievement", nullable: true },
                description: { type: SchemaType.STRING, description: "Description of the achievement", nullable: true },
                link: { type: SchemaType.STRING, description: "Link to the achievement or related content", nullable: true },
              },
              required: ["name"],
            },
          },
        },
        required: ["email", "profile"],
      },
    },
    required: ["user"],
  };  

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `
    Generate a JSON file based on the following resume text. Ensure the structure is hierarchical, with sections like "Skills," "Education," and "Work Experience" properly categorized. Each item should include relevant subfields. Provide only a valid JSON output without any additional text or explanation.
    
    This is the resume:
    ${ resumeText }
    `;

  try {
    const result = await model.generateContent(prompt);

    // Parse the response to ensure it's valid JSON
    const jsonResponse = JSON.parse(result.response.text());
    console.log(jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};