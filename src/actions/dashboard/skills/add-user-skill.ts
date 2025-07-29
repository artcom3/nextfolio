"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addUserSkill(skillId: number) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Check if skill exists
    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill) {
      return { error: "Skill not found" };
    }

    // Check if user already has this skill
    const existingUserSkill = await prisma.userSkill.findFirst({
      where: {
        userId: session.user.id,
        skillId: skillId,
      },
    });

    if (existingUserSkill) {
      return { error: "You already have this skill" };
    }

    // Add skill to user
    await prisma.userSkill.create({
      data: {
        userId: session.user.id,
        skillId: skillId,
      },
    });

    revalidatePath("/dashboard/skills");
    revalidatePath("/dashboard/profile");
    return { success: "Skill added successfully" };
  } catch (error) {
    console.error("Error adding user skill:", error);
    return { error: "Failed to add skill" };
  }
} 