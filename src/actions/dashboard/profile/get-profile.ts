"use server"

import { auth } from "@/auth";
import { ProfileInterface, LanguageInterface } from "@/interfaces/dashboard/profile-interface";
import prisma from "@/lib/prisma";

export const getUserProfile = async (): Promise<ProfileInterface | null> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return null;
  }

  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
    slug: profile.slug || undefined,
    professionalTitle: profile.professionalTitle || undefined,
    bio: profile.bio || undefined,
    location: profile.location || undefined,
    pronouns: profile.pronouns || undefined,
    funFact: profile.funFact || undefined,
    motto: profile.motto || undefined,
    profilePicture: profile.profilePicture || undefined,
    phoneNumber: profile.phoneNumber || undefined,
    socials: profile.socials ? (profile.socials as any) : undefined,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
};

export const getUserLanguages = async (): Promise<LanguageInterface[]> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return [];
  }

  const languages = await prisma.language.findMany({
    where: { profileId: profile.id },
    orderBy: { name: 'asc' }
  });

  return languages.map(lang => ({
    id: lang.id,
    name: lang.name,
    level: lang.level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE',
    profileId: lang.profileId,
    createdAt: lang.createdAt,
    updatedAt: lang.updatedAt,
  }));
}; 