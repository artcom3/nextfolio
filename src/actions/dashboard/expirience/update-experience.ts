"use server"

import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateExperience(
  id: number,
  data: Partial<ExperienceInterface>
): Promise<{ success: boolean; message: string; data?: ExperienceInterface }> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated"
      };
    }

    // Verify the experience belongs to the user
    const existingExperience = await prisma.experience.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!existingExperience) {
      return {
        success: false,
        message: "Experience not found or you don't have permission to edit it"
      };
    }

    const updatedExperience = await prisma.experience.update({
      where: { id: id },
      data: {
        role: data.role,
        company: data.company,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
      },
    });

    // Revalidate the experience page to show the updated data
    revalidatePath('/dashboard/experience');

    return {
      success: true,
      message: "Experience updated successfully",
      data: {
        id: Number(updatedExperience.id),
        role: updatedExperience.role,
        company: updatedExperience.company,
        startDate: updatedExperience.startDate,
        endDate: updatedExperience.endDate,
        description: updatedExperience.description,
        userId: updatedExperience.userId,
        createdAt: updatedExperience.createdAt,
        updatedAt: updatedExperience.updatedAt,
      }
    };
  } catch (error) {
    console.error("Error updating experience:", error);
    return {
      success: false,
      message: "Failed to update experience. Please try again."
    };
  }
}
