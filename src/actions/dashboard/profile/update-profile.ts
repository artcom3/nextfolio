"use server"

import { auth } from "@/auth";
import { ProfileInterface } from "@/interfaces/dashboard/profile-interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateBasicInfo = async (data: {
  fullName: string;
  professionalTitle?: string;
  bio?: string;
  location?: string;
  pronouns?: string;
}): Promise<ProfileInterface> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      fullName: data.fullName,
      professionalTitle: data.professionalTitle,
      bio: data.bio,
      location: data.location,
      pronouns: data.pronouns,
    },
    create: {
      userId: session.user.id,
      fullName: data.fullName,
      professionalTitle: data.professionalTitle,
      bio: data.bio,
      location: data.location,
      pronouns: data.pronouns,
    },
  });

  revalidatePath("/dashboard/profile");

  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
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

export const updateAdditionalDetails = async (data: {
  funFact?: string;
  motto?: string;
  profilePicture?: string;
  phoneNumber?: string;
}): Promise<ProfileInterface> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      funFact: data.funFact,
      motto: data.motto,
      profilePicture: data.profilePicture,
      phoneNumber: data.phoneNumber,
    },
    create: {
      userId: session.user.id,
      fullName: "Please update your name",
      funFact: data.funFact,
      motto: data.motto,
      profilePicture: data.profilePicture,
      phoneNumber: data.phoneNumber,
    },
  });

  revalidatePath("/dashboard/profile");

  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
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

export const updateSocialMedia = async (socials: {
  linkedin?: string;
  github?: string;
  twitter?: string;
}): Promise<ProfileInterface> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      socials: socials,
    },
    create: {
      userId: session.user.id,
      fullName: "Please update your name",
      socials: socials,
    },
  });

  revalidatePath("/dashboard/profile");

  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
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

export const updateLanguages = async (languages: Array<{
  id?: number;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
}>): Promise<void> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  // Get or create profile first
  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {},
    create: {
      userId: session.user.id,
      fullName: "Please update your name",
    },
  });

  // Delete existing languages and recreate them
  await prisma.language.deleteMany({
    where: { profileId: profile.id },
  });

  // Create new languages
  if (languages.length > 0) {
    await prisma.language.createMany({
      data: languages.map(lang => ({
        name: lang.name,
        level: lang.level,
        profileId: profile.id,
        userId: session.user.id,
      })),
    });
  }

  revalidatePath("/dashboard/profile");
};

export const updateSlug = async (slug: string): Promise<{
  success: boolean;
  error?: string;
  profile?: ProfileInterface;
}> => {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    if (!session.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Validate slug if provided
    if (slug) {
      // Check if slug is URL-safe (alphanumeric, hyphens, underscores only)
      const slugRegex = /^[a-zA-Z0-9_-]+$/;
      if (!slugRegex.test(slug)) {
        return {
          success: false,
          error: "Slug can only contain letters, numbers, hyphens, and underscores",
        };
      }

      // Check if slug length is appropriate
      if (slug.length < 3 || slug.length > 50) {
        return {
          success: false,
          error: "Slug must be between 3 and 50 characters",
        };
      }

      // Check if slug is already taken by another user
      const existingProfile = await prisma.profile.findUnique({
        where: { slug },
        select: { userId: true }
      });

      if (existingProfile && existingProfile.userId !== session.user.id) {
        return {
          success: false,
          error: "This slug is already taken. Please choose a different one.",
        };
      }
    }

    // Update the profile with the new slug
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        slug: slug || null,
      },
      create: {
        userId: session.user.id,
        fullName: "Please update your name",
        slug: slug || null,
      },
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      profile: {
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
      },
    };
  } catch (error) {
    console.error("Error updating slug:", error);
    return {
      success: false,
      error: "An error occurred while updating the slug",
    };
  }
}; 