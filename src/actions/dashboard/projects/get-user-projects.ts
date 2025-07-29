"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export interface UserProjectInterface {
  id: number;
  title: string;
  category: string;
}

export async function getUserProjects(): Promise<UserProjectInterface[]> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        title: true,
        category: true,
      },
      orderBy: {
        title: 'asc'
      }
    });

    return projects.map(project => ({
      id: project.id,
      title: project.title,
      category: project.category,
    }));
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return [];
  }
} 