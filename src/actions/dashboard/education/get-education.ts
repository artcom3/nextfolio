"use server"

import { auth } from "@/auth";
import { EducationInterface } from "@/interfaces/dashboard/education-interface";
import prisma from "@/lib/prisma";

export const getAllEducation = async (): Promise<EducationInterface[]> => {

  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const education = await prisma.education.findMany({
    where: { userId: session.user.id },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return education.map(edu => ({
    id: edu.id,
    type: edu.type as "DEGREE" | "CERTIFICATION" | "COURSE",
    degree: edu.degree,
    institution: edu.institution,
    startDate: edu.startDate,
    endDate: edu.endDate,
    description: edu.description,
    userId: edu.userId,
    createdAt: edu.createdAt,
    updatedAt: edu.updatedAt,
  }))
} 