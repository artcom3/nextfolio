import { ProjectStatus, ProjectCategory } from "@prisma/client";


export interface ProjectInterface {
  id: number;
  title: string;
  category: ProjectCategory;
  description?: string | null;
  link?: string | null;
  status: ProjectStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

