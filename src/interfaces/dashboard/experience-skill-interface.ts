export interface ExperienceToolInterface {
  experienceId: number;
  skillId: number;
  skill: {
    id: number;
    name: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ExperienceWithSkillsInterface {
  id: number;
  role: string;
  company: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  experienceTools: ExperienceToolInterface[];
} 