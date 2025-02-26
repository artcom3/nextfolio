

import { auth } from "@/auth";
import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";
import prisma from "@/lib/prisma";

export const getAllExpiriences = async (): Promise<ExperienceInterface[]> => {

  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const expirience = await prisma.experience.findMany({
    where: { userId: session.user.id },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return expirience.map(experience => ({
    id: experience.id,
    jobTitle: experience.jobTitle,
    company: experience.company,
    startDate: experience.startDate ? experience.startDate.toISOString() : null,
    endDate: experience.endDate ? experience.endDate.toISOString() : null,
    responsibilities: experience.responsibilities,
    achievements: experience.achievements,
    technologies: experience.technologies,
    userId: experience.userId,
  }))
}