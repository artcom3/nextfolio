"use server"

import { auth } from "@/auth";
import { ExperienceToolInterface } from "@/interfaces/dashboard/experience-skill-interface";
import prisma from "@/lib/prisma";

export async function getExperienceSkills(experienceId: number): Promise<ExperienceToolInterface[]> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Verify the experience belongs to the user
    const experience = await prisma.experience.findFirst({
      where: {
        id: experienceId,
        userId: session.user.id,
      },
    });

    if (!experience) {
      return [];
    }

    const experienceTools = await prisma.experienceTool.findMany({
      where: {
        experienceId: experienceId,
      },
      include: {
        skill: true,
      },
      orderBy: {
        skill: {
          name: 'asc',
        },
      },
    });

    return experienceTools.map(tool => ({
      experienceId: tool.experienceId,
      skillId: tool.skillId,
      skill: {
        id: tool.skill.id,
        name: tool.skill.name,
        category: tool.skill.category,
        createdAt: tool.skill.createdAt,
        updatedAt: tool.skill.updatedAt,
      },
    }));
  } catch (error) {
    console.error("Error fetching experience skills:", error);
    return [];
  }
} 