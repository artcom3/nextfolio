import { ProjectStatus } from "@prisma/client";


export interface ProjectInterface {
  id: number;
  name: string;
  description?: string | null;
  technologies: string[];
  link?: string | null;
  imageUrl?: string | null;
  status: ProjectStatus;
  metrics?: any | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

