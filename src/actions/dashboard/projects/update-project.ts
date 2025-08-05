"use server"

import { ProjectInterface } from "@/interfaces";
import { ProjectCategory, ProjectStatus } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateProject(
  id: number,
  data: Partial<ProjectInterface>
): Promise<{ success: boolean; message: string; data?: ProjectInterface }> {
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
        message: "Project not found or you don't have permission to edit it"
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: {
        title: data.title,        category: data.category as ProjectCategory,
        description: data.description,
        link: data.link,
        status: data.status as ProjectStatus,
      },
    });

    // Revalidate the projects page to show the updated data
    revalidatePath('/dashboard/projects');

    return {
      success: true,
      message: "Project updated successfully",
      data: {
        id: Number(updatedProject.id),
        title: updatedProject.title,
        category: updatedProject.category,
        description: updatedProject.description,
        link: updatedProject.link,
        status: updatedProject.status,
        userId: updatedProject.userId,
        createdAt: updatedProject.createdAt,
        updatedAt: updatedProject.updatedAt,
      }
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      message: "Failed to update project. Please try again."
    };
  }
}
