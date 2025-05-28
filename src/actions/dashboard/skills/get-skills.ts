import { SkillInterface, UserSkillInterface } from "@/interfaces";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getAllSkills = async (): Promise<SkillInterface[]> => {
  const skills = await prisma.skill.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  return skills.map(skill => ({
    id: skill.id,
    name: skill.name,
    category: skill.category,
    createdAt: skill.createdAt,
    updatedAt: skill.updatedAt,
  }));
};

export const getUserSkills = async (): Promise<UserSkillInterface[]> => {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userSkills = await prisma.userSkill.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      skill: true
    },
    orderBy: {
      skill: {
        name: 'asc'
      }
    }
  });
  return userSkills.map(userSkill => ({
    userId: userSkill.userId,
    skillId: userSkill.skillId,
    skill: {
      id: userSkill.skill.id,
      name: userSkill.skill.name,
      category: userSkill.skill.category,
      createdAt: userSkill.skill.createdAt,
      updatedAt: userSkill.skill.updatedAt,
    }
  }));
};
