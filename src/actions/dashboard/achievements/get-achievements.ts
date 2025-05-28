import { AchievementInterface } from "@/interfaces";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getAllAchievements = async (): Promise<AchievementInterface[]> => {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const achievements = await prisma.achievement.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return achievements.map(achievement => ({
    id: achievement.id,
    title: achievement.title,
    description: achievement.description,
    link: achievement.link,
    userId: achievement.userId,
    createdAt: achievement.createdAt,
    updatedAt: achievement.updatedAt,
  }));
};
