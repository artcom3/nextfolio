"use server";

import { GoogleGenAI } from "@google/genai";

interface Props {
  resumeText: string
}

export const generateContent = async ({ resumeText }: Props) => {
  const schema = {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          bio: { type: "string" },
          profileImage: { type: "string" },
          profile: {
            type: "object",
            properties: {
              fullName: { type: "string" },
              professionalTitle: { type: "string" },
              bio: { type: "string" },
              location: { type: "string" },
              pronouns: { type: "string" },
              funFact: { type: "string" },
              motto: { type: "string" },
              profilePicture: { type: "string" },
              phoneNumber: { type: "string" },
              socials: { type: "string" },
            },
            required: ["fullName"],
          },
          languages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                level: {
                  type: "string",
                  enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "NATIVE"],
                },
              },
              required: ["name", "level"],
            },
          },
          skills: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                category: {
                  type: "string",
                  enum: ["PROGRAMMING_LANGUAGE", "DESIGN_TOOL", "FRAMEWORK", "OTHER"],
                },
              },
              required: ["name", "category"],
            },
          },
          projects: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                category: {
                  type: "string",
                  enum: ["DEVELOPMENT", "GRAPHIC_DESIGN", "INTERIOR", "UI_UX", "WRITING", "OTHER"],
                },
                description: { type: "string" },
                link: { type: "string" },
                status: {
                  type: "string",
                  enum: ["FEATURED", "COLLABORATIVE", "IN_PROGRESS"],
                },
                images: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      url: { type: "string" },
                      caption: { type: "string" },
                    },
                    required: ["url"],
                  },
                },
                projectTools: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      category: {
                        type: "string",
                        enum: ["PROGRAMMING_LANGUAGE", "DESIGN_TOOL", "FRAMEWORK", "OTHER"],
                      },
                    },
                    required: ["name", "category"],
                  },
                },
              },
              required: ["title", "category", "status"],
            },
          },
          experiences: {
            type: "array",
            items: {
              type: "object",
              properties: {
                role: { type: "string" },
                company: { type: "string" },
                startDate: { type: "string", format: "date-time" },
                endDate: { type: "string", format: "date-time" },
                description: { type: "string" },
              },
              required: ["role", "company", "startDate"],
            },
          },
          educations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["DEGREE", "CERTIFICATION", "COURSE"],
                },
                degree: { type: "string" },
                institution: { type: "string" },
                startDate: { type: "string", format: "date-time" },
                endDate: { type: "string", format: "date-time" },
                description: { type: "string" },
              },
              required: ["type", "degree", "institution", "startDate"],
            },
          },
          achievements: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                date: { type: "string", format: "date-time" },
                link: { type: "string" },
              },
              required: ["title"],
            },
          },
          testimonials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                fromName: { type: "string" },
                fromRole: { type: "string" },
                relationship: { type: "string" },
                message: { type: "string" },
                rating: { type: "integer", minimum: 1, maximum: 5 },
              },
              required: ["fromName", "message"],
            },
          },
        },
        required: ["email", "experiences"],
      },
    },
    required: ["user"],
  };

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

  const prompt = `
    Generate a JSON object based on the resume text below.
    
    This is the resume:
    ${ resumeText }
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (!response.text) {
      throw new Error(`Error generating content`);
    }

    // Parse the response to ensure it's valid JSON
    const jsonResponse = JSON.parse(response.text);
    console.log(jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};