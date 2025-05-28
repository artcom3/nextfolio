export interface ExperienceInterface {
  id?: number;
  role: string;
  company: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}