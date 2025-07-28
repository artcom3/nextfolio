"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUserSkill(skillId: number) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Verify the user skill exists
    const existingUserSkill = await prisma.userSkill.findFirst({
      where: {
        userId: session.user.id,
        skillId: skillId,
      },
    });

    if (!existingUserSkill) {
      return { error: "Skill not found in your collection" };
    }

    await prisma.userSkill.delete({
      where: {
        userId_skillId: {
          userId: session.user.id,
          skillId: skillId,
        },
      },
    });

    revalidatePath("/dashboard/skills");
    return { success: "Skill removed successfully" };
  } catch (error) {
    console.error("Error removing user skill:", error);
    return { error: "Failed to remove skill" };
  }
}
