"use server"

import { EducationInterface } from "@/interfaces/dashboard/education-interface";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addEducation(data: Omit<EducationInterface, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; message: string; data?: EducationInterface }> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated"
      };
    }

    const newEducation = await prisma.education.create({
      data: {
        type: data.type,
        degree: data.degree,
        institution: data.institution,
        startDate: data.startDate || new Date(),
        endDate: data.endDate,
        description: data.description,
        userId: session.user.id,
      },
    });

    // Revalidate the education page to show the new data
    revalidatePath('/dashboard/education');

    return {
      success: true,
      message: "Education added successfully",
      data: {
        id: Number(newEducation.id),
        type: newEducation.type as "DEGREE" | "CERTIFICATION" | "COURSE",
        degree: newEducation.degree,
        institution: newEducation.institution,
        startDate: newEducation.startDate,
        endDate: newEducation.endDate,
        description: newEducation.description,
        userId: newEducation.userId,
        createdAt: newEducation.createdAt,
        updatedAt: newEducation.updatedAt,
      }
    };
  } catch (error) {
    console.error("Error adding education:", error);
    return {
      success: false,
      message: "Failed to add education. Please try again."
    };
  }
} 