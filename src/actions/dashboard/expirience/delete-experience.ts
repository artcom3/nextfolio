"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteExperience(
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
        message: "Experience not found or you don't have permission to delete it"
      };
    }

    await prisma.experience.delete({
      where: { id: id },
    });

    // Revalidate the experience page to show the updated data
    revalidatePath('/dashboard/experience');

    return {
      success: true,
      message: "Experience deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return {
      success: false,
      message: "Failed to delete experience. Please try again."
    };
  }
}
