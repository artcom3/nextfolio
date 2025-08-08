"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export interface DashboardSummary {
  profile: {
    fullName: string;
    title?: string;
    bio?: string;
    profilePicture?: string;
    completionPercentage: number;
  };
  stats: {
    totalProjects: number;
    totalSkills: number;
    totalExperiences: number;
    totalEducations: number;
    totalAchievements: number;
  };
  recentActivities: {
    recentProjects: Array<{
      id: number;
      title: string;
      category: string;
      updatedAt: Date;
    }>;
    recentExperiences: Array<{
      id: number;
      role: string;
      company: string;
      startDate: Date;
    }>;
    recentEducations: Array<{
      id: number;
      degree: string;
      institution: string;
      type: string;
    }>;
  };
  skillsByCategory: Array<{
    category: string;
    count: number;
    skills: Array<{
      id: number;
      name: string;
    }>;
  }>;
  portfolioUrl?: string;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Fetch all data in parallel
  const [
    profile,
    projectsCount,
    skillsCount,
    experiencesCount,
    educationsCount,
    achievementsCount,
    recentProjects,
    recentExperiences,
    recentEducations,
    userSkillsWithCategories,
  ] = await Promise.all([
    // Profile data
    prisma.profile.findUnique({
      where: { userId },
    }),
    
    // Counts
    prisma.project.count({ where: { userId } }),
    prisma.userSkill.count({ where: { userId } }),
    prisma.experience.count({ where: { userId } }),
    prisma.education.count({ where: { userId } }),
    prisma.achievement.count({ where: { userId } }),
    
    // Recent activities (last 3 items)
    prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        category: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 3,
    }),
    
    prisma.experience.findMany({
      where: { userId },
      select: {
        id: true,
        role: true,
        company: true,
        startDate: true,
      },
      orderBy: { startDate: 'desc' },
      take: 3,
    }),
    
    prisma.education.findMany({
      where: { userId },
      select: {
        id: true,
        degree: true,
        institution: true,
        type: true,
      },
      orderBy: { startDate: 'desc' },
      take: 3,
    }),
    
    // Skills grouped by category
    prisma.userSkill.findMany({
      where: { userId },
      include: {
        skill: {
          select: {
            id: true,
            name: true,
            category: true,
          }
        }
      },
    }),
  ]);

  // Calculate profile completion percentage
  const profileFields = [
    profile?.fullName,
    profile?.professionalTitle,
    profile?.bio,
    profile?.location,
    profile?.profilePicture,
    profile?.phoneNumber,
  ];
  const completedFields = profileFields.filter(field => field && field.trim() !== '').length;
  const completionPercentage = Math.round((completedFields / profileFields.length) * 100);

  // Group skills by category
  const skillsByCategory = userSkillsWithCategories.reduce((acc, userSkill) => {
    const category = userSkill.skill.category;
    const existingCategory = acc.find(cat => cat.category === category);
    
    if (existingCategory) {
      existingCategory.count++;
      existingCategory.skills.push({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
      });
    } else {
      acc.push({
        category,
        count: 1,
        skills: [{
          id: userSkill.skill.id,
          name: userSkill.skill.name,
        }],
      });
    }
    
    return acc;
  }, [] as Array<{ category: string; count: number; skills: Array<{ id: number; name: string }> }>);

  return {
    profile: {
      fullName: profile?.fullName || 'Unknown User',
      title: profile?.professionalTitle || undefined,
      bio: profile?.bio || undefined,
      profilePicture: profile?.profilePicture || undefined,
      completionPercentage,
    },
    stats: {
      totalProjects: projectsCount,
      totalSkills: skillsCount,
      totalExperiences: experiencesCount,
      totalEducations: educationsCount,
      totalAchievements: achievementsCount,
    },
    recentActivities: {
      recentProjects,
      recentExperiences,
      recentEducations,
    },
    skillsByCategory,
    portfolioUrl: profile?.slug ? `/portfolio/${profile.slug}` : undefined,
  };
};