
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
    name: project.name,
    description: project.description,
    technologies: project.technologies,
    link: project.link,
    imageUrl: project.imageUrl,
    status: project.status,
    metrics: project.metrics,
    userId: project.userId,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }))
}