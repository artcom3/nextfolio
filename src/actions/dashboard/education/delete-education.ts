"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteEducation(
  id: number
): Promise<{ success: boolean; message: string }> {
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
        message: "Education not found or you don't have permission to delete it"
      };
    }

    await prisma.education.delete({
      where: { id: id },
    });

    // Revalidate the education page to show the updated data
    revalidatePath('/dashboard/education');

    return {
      success: true,
      message: "Education deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting education:", error);
    return {
      success: false,
      message: "Failed to delete education. Please try again."
    };
  }
} 