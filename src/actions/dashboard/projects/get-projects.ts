
import { ProjectInterface } from "@/interfaces";
import prisma from "@/lib/prisma";

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