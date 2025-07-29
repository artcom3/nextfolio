"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeExperienceSkill(experienceId: number, skillId: number) {
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

    // Remove the experience-skill relationship
    const deleted = await prisma.experienceTool.deleteMany({
      where: {
        experienceId: experienceId,
        skillId: skillId,
      },
    });

    if (deleted.count === 0) {
      return { error: "Skill not associated with this experience" };
    }

    // Don't revalidate path immediately to keep dialog open  
    // revalidatePath("/dashboard/experience");
    return { success: "Skill removed from experience" };
  } catch (error) {
    console.error("Error removing skill from experience:", error);
    return { error: "Failed to remove skill from experience" };
  }
} 