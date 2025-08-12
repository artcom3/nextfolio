"use server";

import { revalidatePath } from "next/cache";
import { deleteImage } from "./delete-image";
import { uploadImage } from "./upload-image";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

interface UpdateImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Update/replace an image in storage
 * @param oldUrl - The URL of the image to replace
 * @param newFile - The new file to upload
 * @param bucket - The storage bucket name (default: 'images')
 * @param folder - Optional folder path within the bucket
 */
export async function updateImage(
  oldUrl: string,
  newFile: File,
  bucket: string = "images",
  folder?: string
): Promise<UpdateImageResult> {
  try {
    // Upload new image first
    const uploadResult = await uploadImage(newFile, bucket, folder);
    
    if (!uploadResult.success || !uploadResult.url) {
      return uploadResult;
    }

    // Delete old image if it's from our storage
    if (oldUrl.includes('supabase')) {
      const deleteResult = await deleteImage(oldUrl, bucket);
      if (!deleteResult.success) {
        console.warn('Could not delete old image:', deleteResult.error);
        // Continue even if deletion fails - we have the new image uploaded
      }
    }

    return {
      success: true,
      url: uploadResult.url
    };

  } catch (error) {
    console.error('Update image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Update profile image
 * @param userId - The user ID
 * @param newFile - The new profile image file
 */
export async function updateProfileImage(
  userId: string,
  newFile: File
): Promise<UpdateImageResult> {
  try {
    // Verify user session
    const session = await auth();
    if (!session?.user?.id || session.user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Get current profile image using Prisma
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { profilePicture: true }
    });

    // Upload new image
    const uploadResult = await uploadImage(newFile, 'images', 'profiles');
    
    if (!uploadResult.success || !uploadResult.url) {
      return uploadResult;
    }

    // Update profile with new image URL using Prisma
    await prisma.profile.upsert({
      where: { userId },
      update: {
        profilePicture: uploadResult.url
      },
      create: {
        userId,
        fullName: session.user.name || 'User',
        profilePicture: uploadResult.url
      }
    });

    // Delete old image if it exists and is from our storage
    if (profile?.profilePicture && profile.profilePicture.includes('supabase')) {
      try {
        await deleteImage(profile.profilePicture);
      } catch (deleteError) {
        console.warn('Could not delete old profile image:', deleteError);
      }
    }

    revalidatePath('/dashboard/profile');
    revalidatePath('/portfolio/[slug]', 'page');

    return {
      success: true,
      url: uploadResult.url
    };

  } catch (error) {
    console.error('Update profile image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Update project image
 * @param imageId - The image ID from the database
 * @param newFile - The new image file
 */
export async function updateProjectImage(
  imageId: number,
  newFile: File
): Promise<UpdateImageResult> {
  try {
    // Verify user session
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Get current image and verify ownership using Prisma
    const currentImage = await prisma.image.findFirst({
      where: {
        id: imageId,
        project: {
          userId: session.user.id
        }
      },
      select: { url: true }
    });

    if (!currentImage) {
      return {
        success: false,
        error: 'Image not found or access denied'
      };
    }

    // Upload new image
    const uploadResult = await uploadImage(newFile, 'images', 'projects');
    
    if (!uploadResult.success || !uploadResult.url) {
      return uploadResult;
    }

    // Update database with new URL using Prisma
    await prisma.image.update({
      where: { id: imageId },
      data: {
        url: uploadResult.url
      }
    });

    // Delete old image if it's from our storage
    if (currentImage.url.includes('supabase')) {
      try {
        await deleteImage(currentImage.url);
      } catch (deleteError) {
        console.warn('Could not delete old project image:', deleteError);
      }
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/portfolio/[slug]', 'page');

    return {
      success: true,
      url: uploadResult.url
    };

  } catch (error) {
    console.error('Update project image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Update project image caption
 * @param imageId - The image ID from the database
 * @param caption - The new caption
 */
export async function updateProjectImageCaption(
  imageId: number,
  caption: string
): Promise<UpdateImageResult> {
  try {
    // Verify user session
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Verify ownership and update caption using Prisma
    const updatedImage = await prisma.image.updateMany({
      where: {
        id: imageId,
        project: {
          userId: session.user.id
        }
      },
      data: {
        caption
      }
    });

    if (updatedImage.count === 0) {
      return {
        success: false,
        error: 'Image not found or access denied'
      };
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/portfolio/[slug]', 'page');

    return {
      success: true
    };

  } catch (error) {
    console.error('Update caption error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
