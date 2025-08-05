"use server"

import { ProjectInterface } from "@/interfaces/dashboard/project-interface";
import { ProjectCategory, ProjectStatus } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addProject(data: Omit<ProjectInterface, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; message: string; data?: ProjectInterface }> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated"
      };
    }

    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        category: data.category as ProjectCategory,
        description: data.description,
        link: data.link,
        status: data.status as ProjectStatus,
        userId: session.user.id,
      },
    });

    // Revalidate the projects page to show the new data
    revalidatePath('/dashboard/projects');

    return {
      success: true,
      message: "Project added successfully",
      data: {
        id: Number(newProject.id),
        title: newProject.title,
        category: newProject.category,
        description: newProject.description,
        link: newProject.link,
        status: newProject.status,
        userId: newProject.userId,
        createdAt: newProject.createdAt,
        updatedAt: newProject.updatedAt,
      }
    };
  } catch (error) {
    console.error("Error adding project:", error);
    return {
      success: false,
      message: "Failed to add project. Please try again."
    };
  }
} 