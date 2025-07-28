"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteAchievement(achievementId: number) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Verify the achievement belongs to the user
    const existingAchievement = await prisma.achievement.findFirst({
      where: {
        id: achievementId,
        userId: session.user.id,
      },
    });

    if (!existingAchievement) {
      return { error: "Achievement not found" };
    }

    await prisma.achievement.delete({
      where: {
        id: achievementId,
      },
    });

    revalidatePath("/dashboard/achievements");
    return { success: "Achievement deleted successfully" };
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return { error: "Failed to delete achievement" };
  }
}
