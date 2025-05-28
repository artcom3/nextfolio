import { SkillCategory } from "@prisma/client";

export interface SkillInterface {
  id: number;
  name: string;
  category: SkillCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSkillInterface {
  userId: string;
  skillId: number;
  skill: SkillInterface;
}
