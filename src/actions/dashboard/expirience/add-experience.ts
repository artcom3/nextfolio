"use server"

import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addExperience(data: Omit<ExperienceInterface, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; message: string; data?: ExperienceInterface }> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated"
      };
    }    const newExperience = await prisma.experience.create({
      data: {
        role: data.role,
        company: data.company,
        startDate: data.startDate || new Date(),
        endDate: data.endDate,
        description: data.description,
        userId: session.user.id,
      },
    });

    // Revalidate the experience page to show the new data
    revalidatePath('/dashboard/experience');

    return {
      success: true,
      message: "Experience added successfully",
      data: {
        id: Number(newExperience.id),
        role: newExperience.role,
        company: newExperience.company,
        startDate: newExperience.startDate,
        endDate: newExperience.endDate,
        description: newExperience.description,
        userId: newExperience.userId,
        createdAt: newExperience.createdAt,
        updatedAt: newExperience.updatedAt,
      }
    };
  } catch (error) {
    console.error("Error adding experience:", error);
    return {
      success: false,
      message: "Failed to add experience. Please try again."
    };
  }
}
