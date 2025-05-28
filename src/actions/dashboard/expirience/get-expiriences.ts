

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
    role: experience.role,
    company: experience.company,
    startDate: experience.startDate,
    endDate: experience.endDate,
    description: experience.description,
    userId: experience.userId,
    createdAt: experience.createdAt,
    updatedAt: experience.updatedAt,
  }))
}