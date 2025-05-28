export interface AchievementInterface {
  id: number;
  title: string;
  description?: string | null;
  date?: Date | null;
  link?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
