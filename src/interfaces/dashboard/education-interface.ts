export interface EducationInterface {
  id?: number;
  type: "DEGREE" | "CERTIFICATION" | "COURSE";
  degree: string;
  institution: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
} 