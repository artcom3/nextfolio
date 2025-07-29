"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addExperienceSkill(experienceId: number, skillId: number) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Verify the experience belongs to the user
    const experience = await prisma.experience.findFirst({
      where: {
        id: experienceId,
        userId: session.user.id,
      },
    });

    if (!experience) {
      return { error: "Experience not found" };
    }

    // Verify the skill exists and belongs to the user
    const userSkill = await prisma.userSkill.findFirst({
      where: {
        skillId: skillId,
        userId: session.user.id,
      },
      include: {
        skill: true,
      },
    });

    if (!userSkill) {
      return { error: "Skill not found in your collection" };
    }

    // Check if the relationship already exists
    const existingRelation = await prisma.experienceTool.findFirst({
      where: {
        experienceId: experienceId,
        skillId: skillId,
      },
    });

    if (existingRelation) {
      return { error: "Skill already associated with this experience" };
    }

    // Create the experience-skill relationship
    await prisma.experienceTool.create({
      data: {
        experienceId: experienceId,
        skillId: skillId,
      },
    });

    // Don't revalidate path immediately to keep dialog open
    // revalidatePath("/dashboard/experience");
    return { success: `${userSkill.skill.name} added to experience` };
  } catch (error) {
    console.error("Error adding skill to experience:", error);
    return { error: "Failed to add skill to experience" };
  }
} 