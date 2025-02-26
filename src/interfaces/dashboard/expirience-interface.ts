export interface ExperienceInterface {
  id?: number;
  jobTitle: string;
  company: string;
  startDate?: string | null;
  endDate?: string | null;
  responsibilities?: string | null;
  achievements?: string | null;
  technologies: string[];
  userId: string;
}