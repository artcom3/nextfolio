"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSkill(data: {
  name: string;
  category: 'PROGRAMMING_LANGUAGE' | 'DESIGN_TOOL' | 'FRAMEWORK' | 'OTHER';
  projectIds?: number[];
}) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Check if skill already exists
    const existingSkill = await prisma.skill.findFirst({
      where: { 
        name: {
          equals: data.name,
          mode: 'insensitive'
        }
      },
    });

    let skill;
    if (existingSkill) {
      skill = existingSkill;
    } else {
      // Create new skill
      skill = await prisma.skill.create({
        data: {
          name: data.name,
          category: data.category,
        },
      });
    }

    // Add skill to user if they don't have it
    const existingUserSkill = await prisma.userSkill.findFirst({
      where: {
        userId: session.user.id,
        skillId: skill.id,
      },
    });

    if (!existingUserSkill) {
      await prisma.userSkill.create({
        data: {
          userId: session.user.id,
          skillId: skill.id,
        },
      });
    }

    // Associate with projects if provided
    if (data.projectIds && data.projectIds.length > 0) {
      // First, verify all projects belong to the user
      const userProjects = await prisma.project.findMany({
        where: {
          id: { in: data.projectIds },
          userId: session.user.id,
        },
      });

      // Create project tool relationships
      for (const project of userProjects) {
        await prisma.projectTool.upsert({
          where: {
            projectId_skillId: {
              projectId: project.id,
              skillId: skill.id,
            },
          },
          update: {},
          create: {
            projectId: project.id,
            skillId: skill.id,
          },
        });
      }
    }

    revalidatePath("/dashboard/skills");
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard/projects");

    return { 
      success: existingSkill ? "Skill added to your profile!" : "New skill created and added to your profile!",
      skill: {
        id: skill.id,
        name: skill.name,
        category: skill.category,
      }
    };
  } catch (error) {
    console.error("Error creating skill:", error);
    return { error: "Failed to create skill" };
  }
} 