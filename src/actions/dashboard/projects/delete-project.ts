"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteProject(
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

    // Verify the project belongs to the user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!existingProject) {
      return {
        success: false,
        message: "Project not found or you don't have permission to delete it"
      };
    }

    await prisma.project.delete({
      where: { id: id },
    });

    // Revalidate the projects page to show the updated data
    revalidatePath('/dashboard/projects');

    return {
      success: true,
      message: "Project deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      message: "Failed to delete project. Please try again."
    };
  }
}
