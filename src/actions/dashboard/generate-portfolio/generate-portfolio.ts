"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { LanguageLevel, SkillCategory, ProjectCategory, ProjectStatus, EducationType } from "@prisma/client";

// Helper functions to validate and convert string values to enums
function validateLanguageLevel(level: string): LanguageLevel {
  const validLevels = Object.values(LanguageLevel);
  const upperLevel = level.toUpperCase().replace(/\s+/g, '_') as LanguageLevel;
  
  // Handle common variations
  const levelMappings: Record<string, LanguageLevel> = {
    'BASIC': LanguageLevel.BEGINNER,
    'ELEMENTARY': LanguageLevel.BEGINNER,
    'NOVICE': LanguageLevel.BEGINNER,
    'INTERMEDIATE': LanguageLevel.INTERMEDIATE,
    'UPPER_INTERMEDIATE': LanguageLevel.ADVANCED,
    'PROFICIENT': LanguageLevel.ADVANCED,
    'FLUENT': LanguageLevel.ADVANCED,
    'EXPERT': LanguageLevel.ADVANCED,
    'NATIVE': LanguageLevel.NATIVE,
    'MOTHER_TONGUE': LanguageLevel.NATIVE,
  };
  
  if (validLevels.includes(upperLevel)) {
    return upperLevel;
  }
  
  if (levelMappings[upperLevel]) {
    return levelMappings[upperLevel];
  }
  
  console.warn(`Invalid language level: ${level}, defaulting to BEGINNER`);
  return LanguageLevel.BEGINNER;
}

function validateSkillCategory(category: string): SkillCategory {
  const validCategories = Object.values(SkillCategory);
  const upperCategory = category.toUpperCase().replace(/\s+/g, '_') as SkillCategory;
  
  // Handle common variations
  const categoryMappings: Record<string, SkillCategory> = {
    'PROGRAMMING': SkillCategory.PROGRAMMING_LANGUAGE,
    'LANGUAGE': SkillCategory.PROGRAMMING_LANGUAGE,
    'CODE': SkillCategory.PROGRAMMING_LANGUAGE,
    'DESIGN': SkillCategory.DESIGN_TOOL,
    'TOOL': SkillCategory.DESIGN_TOOL,
    'GRAPHIC': SkillCategory.DESIGN_TOOL,
    'FRAMEWORK': SkillCategory.FRAMEWORK,
    'LIBRARY': SkillCategory.FRAMEWORK,
    'TECH': SkillCategory.OTHER,
    'TECHNOLOGY': SkillCategory.OTHER,
    'SOFT_SKILL': SkillCategory.OTHER,
    'SOFT': SkillCategory.OTHER,
  };
  
  if (validCategories.includes(upperCategory)) {
    return upperCategory;
  }
  
  if (categoryMappings[upperCategory]) {
    return categoryMappings[upperCategory];
  }
  
  console.warn(`Invalid skill category: ${category}, defaulting to OTHER`);
  return SkillCategory.OTHER;
}

function validateProjectCategory(category: string): ProjectCategory {
  const validCategories = Object.values(ProjectCategory);
  const upperCategory = category.toUpperCase().replace(/\s+/g, '_') as ProjectCategory;
  
  // Handle common variations
  const categoryMappings: Record<string, ProjectCategory> = {
    'WEB_DEVELOPMENT': ProjectCategory.DEVELOPMENT,
    'SOFTWARE_DEVELOPMENT': ProjectCategory.DEVELOPMENT,
    'APP_DEVELOPMENT': ProjectCategory.DEVELOPMENT,
    'MOBILE_DEVELOPMENT': ProjectCategory.DEVELOPMENT,
    'DEVELOPMENT': ProjectCategory.DEVELOPMENT,
    'DESIGN': ProjectCategory.GRAPHIC_DESIGN,
    'GRAPHIC': ProjectCategory.GRAPHIC_DESIGN,
    'VISUAL_DESIGN': ProjectCategory.GRAPHIC_DESIGN,
    'INTERIOR_DESIGN': ProjectCategory.INTERIOR,
    'ARCHITECTURE': ProjectCategory.INTERIOR,
    'UI': ProjectCategory.UI_UX,
    'UX': ProjectCategory.UI_UX,
    'USER_INTERFACE': ProjectCategory.UI_UX,
    'USER_EXPERIENCE': ProjectCategory.UI_UX,
    'WRITING': ProjectCategory.WRITING,
    'CONTENT': ProjectCategory.WRITING,
    'COPYWRITING': ProjectCategory.WRITING,
  };
  
  if (validCategories.includes(upperCategory)) {
    return upperCategory;
  }
  
  if (categoryMappings[upperCategory]) {
    return categoryMappings[upperCategory];
  }
  
  console.warn(`Invalid project category: ${category}, defaulting to OTHER`);
  return ProjectCategory.OTHER;
}

function validateProjectStatus(status: string): ProjectStatus {
  const validStatuses = Object.values(ProjectStatus);
  const upperStatus = status.toUpperCase().replace(/\s+/g, '_') as ProjectStatus;
  
  // Handle common variations
  const statusMappings: Record<string, ProjectStatus> = {
    'COMPLETED': ProjectStatus.FEATURED,
    'FINISHED': ProjectStatus.FEATURED,
    'DONE': ProjectStatus.FEATURED,
    'FEATURED': ProjectStatus.FEATURED,
    'HIGHLIGHT': ProjectStatus.FEATURED,
    'COLLABORATION': ProjectStatus.COLLABORATIVE,
    'TEAM': ProjectStatus.COLLABORATIVE,
    'GROUP': ProjectStatus.COLLABORATIVE,
    'ONGOING': ProjectStatus.IN_PROGRESS,
    'ACTIVE': ProjectStatus.IN_PROGRESS,
    'CURRENT': ProjectStatus.IN_PROGRESS,
    'WIP': ProjectStatus.IN_PROGRESS,
    'WORK_IN_PROGRESS': ProjectStatus.IN_PROGRESS,
  };
  
  if (validStatuses.includes(upperStatus)) {
    return upperStatus;
  }
  
  if (statusMappings[upperStatus]) {
    return statusMappings[upperStatus];
  }
  
  console.warn(`Invalid project status: ${status}, defaulting to IN_PROGRESS`);
  return ProjectStatus.IN_PROGRESS;
}

function validateEducationType(type: string): EducationType {
  const validTypes = Object.values(EducationType);
  const upperType = type.toUpperCase().replace(/\s+/g, '_') as EducationType;
  
  // Handle common variations
  const typeMappings: Record<string, EducationType> = {
    'UNIVERSITY': EducationType.DEGREE,
    'COLLEGE': EducationType.DEGREE,
    'BACHELOR': EducationType.DEGREE,
    'MASTERS': EducationType.DEGREE,
    'MASTER': EducationType.DEGREE,
    'PHD': EducationType.DEGREE,
    'DOCTORATE': EducationType.DEGREE,
    'ASSOCIATE': EducationType.DEGREE,
    'CERTIFICATE': EducationType.CERTIFICATION,
    'CERT': EducationType.CERTIFICATION,
    'LICENSE': EducationType.CERTIFICATION,
    'DIPLOMA': EducationType.CERTIFICATION,
    'TRAINING': EducationType.COURSE,
    'WORKSHOP': EducationType.COURSE,
    'BOOTCAMP': EducationType.COURSE,
    'ONLINE_COURSE': EducationType.COURSE,
    'MOOC': EducationType.COURSE,
  };
  
  if (validTypes.includes(upperType)) {
    return upperType;
  }
  
  if (typeMappings[upperType]) {
    return typeMappings[upperType];
  }
  
  console.warn(`Invalid education type: ${type}, defaulting to COURSE`);
  return EducationType.COURSE;
}

interface GeneratedLanguage {
  name: string;
  level: string; // Will be converted to LanguageLevel enum
}

interface GeneratedSkill {
  name: string;
  category: string; // Will be converted to SkillCategory enum
}

interface GeneratedProjectImage {
  url: string;
  caption?: string;
}

interface GeneratedProjectTool {
  name: string;
  category: string; // Will be converted to SkillCategory enum
}

interface GeneratedProject {
  title: string;
  category: string; // Will be converted to ProjectCategory enum
  description?: string;
  link?: string;
  status: string; // Will be converted to ProjectStatus enum
  images?: GeneratedProjectImage[];
  projectTools?: GeneratedProjectTool[];
}

interface GeneratedExperience {
  role: string;
  company: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

interface GeneratedEducation {
  type: string; // Will be converted to EducationType enum
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface GeneratedAchievement {
  title: string;
  description?: string;
  date?: string;
  link?: string;
}

interface GeneratedTestimonial {
  fromName: string;
  fromRole?: string;
  relationship?: string;
  message: string;
  rating?: number;
}

interface GeneratedProfile {
  fullName: string;
  professionalTitle?: string;
  bio?: string;
  location?: string;
  pronouns?: string;
  funFact?: string;
  motto?: string;
  profilePicture?: string;
  phoneNumber?: string;
  socials?: string;
}

interface GeneratedPortfolio {
  user: {
    name?: string;
    email: string;
    bio?: string;
    profileImage?: string;
    profile: GeneratedProfile;
    languages?: GeneratedLanguage[];
    skills?: GeneratedSkill[];
    projects?: GeneratedProject[];
    experiences?: GeneratedExperience[];
    educations?: GeneratedEducation[];
    achievements?: GeneratedAchievement[];
    testimonials?: GeneratedTestimonial[];
  };
}

export default async function generatePortfolio(json: GeneratedPortfolio) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    // Start a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // 1. Update user basic information
      if (json.user.name || json.user.bio || json.user.profileImage) {
        await tx.user.update({
          where: { id: userId },
          data: {
            ...(json.user.name && { name: json.user.name }),
            ...(json.user.bio && { bio: json.user.bio }),
            ...(json.user.profileImage && { profileImage: json.user.profileImage }),
          },
        });
      }      // 2. Create or update profile
      const profileData = {
        fullName: json.user.profile.fullName,
        ...(json.user.profile.professionalTitle && { professionalTitle: json.user.profile.professionalTitle }),
        ...(json.user.profile.bio && { bio: json.user.profile.bio }),
        ...(json.user.profile.location && { location: json.user.profile.location }),
        ...(json.user.profile.pronouns && { pronouns: json.user.profile.pronouns }),
        ...(json.user.profile.funFact && { funFact: json.user.profile.funFact }),
        ...(json.user.profile.motto && { motto: json.user.profile.motto }),
        ...(json.user.profile.profilePicture && { profilePicture: json.user.profile.profilePicture }),
        ...(json.user.profile.phoneNumber && { phoneNumber: json.user.profile.phoneNumber }),        ...(json.user.profile.socials && { 
          socials: (() => {
            try {
              // Check if it's already an object
              if (typeof json.user.profile.socials === 'object') {
                return json.user.profile.socials;
              }
              // Only try to parse if it looks like JSON (starts with { or [)
              if (typeof json.user.profile.socials === 'string') {
                const trimmed = json.user.profile.socials.trim();
                if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                  return JSON.parse(json.user.profile.socials);
                }
                // If it's just a plain string, return it as is
                return json.user.profile.socials;
              }
              return json.user.profile.socials;
            } catch (error) {
              console.warn("Failed to parse socials JSON, storing as string:", error);
              return json.user.profile.socials;
            }
          })()
        }),
      };

      await tx.profile.upsert({
        where: { userId },
        update: profileData,
        create: {
          userId,
          ...profileData,
        },
      });

      // Get the profile to use its ID for languages
      const profile = await tx.profile.findUnique({
        where: { userId },
        select: { id: true },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }      // 3. Create languages
      if (json.user.languages && json.user.languages.length > 0) {
        await tx.language.createMany({
          data: json.user.languages.map((language) => ({
            userId,
            profileId: profile.id,
            name: language.name,
            level: validateLanguageLevel(language.level),
          })),
          skipDuplicates: true,
        });
      }      // 4. Create skills and user skills
      if (json.user.skills && json.user.skills.length > 0) {
        for (const skillData of json.user.skills) {
          // Try to find existing skill first
          let skill = await tx.skill.findFirst({
            where: { 
              name: skillData.name,
              category: validateSkillCategory(skillData.category),
            },
          });

          // Create skill if it doesn't exist
          if (!skill) {
            skill = await tx.skill.create({
              data: {
                name: skillData.name,
                category: validateSkillCategory(skillData.category),
              },
            });
          }

          // Create user skill relationship
          await tx.userSkill.upsert({
            where: {
              userId_skillId: {
                userId,
                skillId: skill.id,
              }
            },
            update: {},
            create: {
              userId,
              skillId: skill.id,
            },
          });
        }
      }      // 5. Create projects with images and tools
      if (json.user.projects && json.user.projects.length > 0) {
        for (const projectData of json.user.projects) {
          const project = await tx.project.create({
            data: {
              userId,
              title: projectData.title,
              category: validateProjectCategory(projectData.category),
              status: validateProjectStatus(projectData.status),
              ...(projectData.description && { description: projectData.description }),
              ...(projectData.link && { link: projectData.link }),
            },
          });

          // Create project images
          if (projectData.images && projectData.images.length > 0) {
            await tx.image.createMany({
              data: projectData.images.map((image) => ({
                projectId: project.id,
                url: image.url,
                ...(image.caption && { caption: image.caption }),
              })),
            });
          }          // Create project tools
          if (projectData.projectTools && projectData.projectTools.length > 0) {
            for (const toolData of projectData.projectTools) {
              // Try to find existing skill for the tool
              let tool = await tx.skill.findFirst({
                where: { 
                  name: toolData.name,
                  category: validateSkillCategory(toolData.category),
                },
              });

              // Create skill if it doesn't exist
              if (!tool) {
                tool = await tx.skill.create({
                  data: {
                    name: toolData.name,
                    category: validateSkillCategory(toolData.category),
                  },
                });
              }

              // Create project tool relationship
              await tx.projectTool.create({
                data: {
                  projectId: project.id,
                  skillId: tool.id,
                },
              });
            }
          }
        }
      }

      // 6. Create experiences
      if (json.user.experiences && json.user.experiences.length > 0) {
        await tx.experience.createMany({
          data: json.user.experiences.map((experience) => ({
            userId,
            role: experience.role,
            company: experience.company,
            startDate: new Date(experience.startDate),
            ...(experience.endDate && { endDate: new Date(experience.endDate) }),
            ...(experience.description && { description: experience.description }),
          })),
        });
      }      // 7. Create educations
      if (json.user.educations && json.user.educations.length > 0) {
        await tx.education.createMany({
          data: json.user.educations.map((education) => ({
            userId,
            type: validateEducationType(education.type),
            degree: education.degree,
            institution: education.institution,
            startDate: new Date(education.startDate),
            ...(education.endDate && { endDate: new Date(education.endDate) }),
            ...(education.description && { description: education.description }),
          })),
        });
      }

      // 8. Create achievements
      if (json.user.achievements && json.user.achievements.length > 0) {
        await tx.achievement.createMany({
          data: json.user.achievements.map((achievement) => ({
            userId,
            title: achievement.title,
            ...(achievement.description && { description: achievement.description }),
            ...(achievement.date && { date: new Date(achievement.date) }),
            ...(achievement.link && { link: achievement.link }),
          })),
        });
      }

      // 9. Create testimonials
      if (json.user.testimonials && json.user.testimonials.length > 0) {
        await tx.testimonial.createMany({
          data: json.user.testimonials.map((testimonial) => ({
            userId,
            fromName: testimonial.fromName,
            message: testimonial.message,
            ...(testimonial.fromRole && { fromRole: testimonial.fromRole }),
            ...(testimonial.relationship && { relationship: testimonial.relationship }),
            ...(testimonial.rating && { rating: testimonial.rating }),
          })),
        });
      }
    });    console.log("Portfolio generated successfully");
    return { 
      success: true, 
      message: "Portfolio generated successfully",
      summary: {
        user: json.user.name || "User",
        email: json.user.email,
        hasProfile: !!json.user.profile,
        languagesCount: json.user.languages?.length || 0,
        skillsCount: json.user.skills?.length || 0,
        projectsCount: json.user.projects?.length || 0,
        experiencesCount: json.user.experiences?.length || 0,
        educationsCount: json.user.educations?.length || 0,
        achievementsCount: json.user.achievements?.length || 0,
        testimonialsCount: json.user.testimonials?.length || 0,
      }
    };

  } catch (error) {
    console.error("Error generating portfolio:", error);
    throw new Error("Failed to generate portfolio");
  }
}