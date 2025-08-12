
import { ProjectInterface } from "@/interfaces";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getAllProjects = async (): Promise<ProjectInterface[]> => {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return projects.map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    description: project.description,
    link: project.link,
    status: project.status,
    userId: project.userId,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }))
}

export const getUserProjectsForDashboard = async (): Promise<ProjectInterface[]> => {
  const session = await auth();
  
  if (!session?.user?.id) {
    return [];
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return projects.map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    description: project.description,
    link: project.link,
    status: project.status,
    userId: project.userId,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }))
}