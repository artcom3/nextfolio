"use server"

import { EducationInterface } from "@/interfaces/dashboard/education-interface";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateEducation(
  id: number,
  data: Partial<EducationInterface>
): Promise<{ success: boolean; message: string; data?: EducationInterface }> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated"
      };
    }

    // Verify the education belongs to the user
    const existingEducation = await prisma.education.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!existingEducation) {
      return {
        success: false,
        message: "Education not found or you don't have permission to edit it"
      };
    }

    const updatedEducation = await prisma.education.update({
      where: { id: id },
      data: {
        type: data.type,
        degree: data.degree,
        institution: data.institution,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
      },
    });

    // Revalidate the education page to show the updated data
    revalidatePath('/dashboard/education');

    return {
      success: true,
      message: "Education updated successfully",
      data: {
        id: Number(updatedEducation.id),
        type: updatedEducation.type as "DEGREE" | "CERTIFICATION" | "COURSE",
        degree: updatedEducation.degree,
        institution: updatedEducation.institution,
        startDate: updatedEducation.startDate,
        endDate: updatedEducation.endDate,
        description: updatedEducation.description,
        userId: updatedEducation.userId,
        createdAt: updatedEducation.createdAt,
        updatedAt: updatedEducation.updatedAt,
      }
    };
  } catch (error) {
    console.error("Error updating education:", error);
    return {
      success: false,
      message: "Failed to update education. Please try again."
    };
  }
} 