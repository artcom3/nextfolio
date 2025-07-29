"use server"

import { auth } from "@/auth";
import { ExperienceWithSkillsInterface } from "@/interfaces/dashboard/experience-skill-interface";
import prisma from "@/lib/prisma";

export const getExperiencesWithSkills = async (): Promise<ExperienceWithSkillsInterface[]> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const experiences = await prisma.experience.findMany({
    where: { userId: session.user.id },
    include: {
      experienceTools: {
        include: {
          skill: true
        },
        orderBy: {
          skill: {
            name: 'asc'
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return experiences.map(experience => ({
    id: experience.id,
    role: experience.role,
    company: experience.company,
    startDate: experience.startDate,
    endDate: experience.endDate,
    description: experience.description,
    userId: experience.userId,
    createdAt: experience.createdAt,
    updatedAt: experience.updatedAt,
    experienceTools: experience.experienceTools.map(tool => ({
      experienceId: tool.experienceId,
      skillId: tool.skillId,
      skill: {
        id: tool.skill.id,
        name: tool.skill.name,
        category: tool.skill.category,
        createdAt: tool.skill.createdAt,
        updatedAt: tool.skill.updatedAt,
      }
    }))
  }));
}; 