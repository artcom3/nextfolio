"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateAchievementSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.date().optional(),
  link: z.string().url().optional().or(z.literal("")),
});

export async function updateAchievement(data: z.infer<typeof updateAchievementSchema>) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const validatedData = updateAchievementSchema.parse(data);

    // Verify the achievement belongs to the user
    const existingAchievement = await prisma.achievement.findFirst({
      where: {
        id: validatedData.id,
        userId: session.user.id,
      },
    });

    if (!existingAchievement) {
      return { error: "Achievement not found" };
    }

    await prisma.achievement.update({
      where: {
        id: validatedData.id,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
        date: validatedData.date || null,
        link: validatedData.link || null,
      },
    });

    revalidatePath("/dashboard/achievements");
    return { success: "Achievement updated successfully" };
  } catch (error) {
    console.error("Error updating achievement:", error);
    return { error: "Failed to update achievement" };
  }
}
