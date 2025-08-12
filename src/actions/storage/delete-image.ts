"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

interface DeleteImageResult {
  success: boolean;
  error?: string;
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name (default: 'images')
 */
export async function deleteImage(
  url: string,
  bucket: string = "images"
): Promise<DeleteImageResult> {
  try {
    const supabase = await createClient();

    // Extract file path from URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part === bucket);
    
    if (bucketIndex === -1 || bucketIndex === urlParts.length - 1) {
      return {
        success: false,
        error: 'Invalid image URL format'
      };
    }

    const filePath = urlParts.slice(bucketIndex + 1).join('/');

    // Delete file from storage
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true
    };

  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Delete profile image and update profile
 * @param userId - The user ID
 */
export async function deleteProfileImage(userId: string): Promise<DeleteImageResult> {
  try {
    // Verify user session
    const session = await auth();
    if (!session?.user?.id || session.user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Get current profile image URL using Prisma
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { profilePicture: true }
    });

    if (!profile?.profilePicture) {
      return {
        success: false,
        error: 'No profile image found'
      };
    }

    // Delete image from storage if it's from our Supabase storage
    if (profile.profilePicture.includes('supabase')) {
      const deleteResult = await deleteImage(profile.profilePicture);
      if (!deleteResult.success) {
        console.warn('Could not delete image from storage:', deleteResult.error);
        // Continue with database update even if storage deletion fails
      }
    }

    // Update profile to remove image URL using Prisma
    await prisma.profile.update({
      where: { userId },
      data: {
        profilePicture: null
      }
    });

    revalidatePath('/dashboard/profile');
    revalidatePath('/portfolio/[slug]', 'page');

    return {
      success: true
    };

  } catch (error) {
    console.error('Delete profile image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Delete project image
 * @param imageId - The image ID from the database
 */
export async function deleteProjectImage(imageId: number): Promise<DeleteImageResult> {
  try {
    // Verify user session
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Get image URL and verify ownership using Prisma
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
        project: {
          userId: session.user.id
        }
      },
      select: {
        url: true
      }
    });

    if (!image?.url) {
      return {
        success: false,
        error: 'Image not found or access denied'
      };
    }

    // Delete from storage
    const deleteResult = await deleteImage(image.url);
    if (!deleteResult.success) {
      console.warn('Could not delete image from storage:', deleteResult.error);
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database using Prisma
    await prisma.image.delete({
      where: { id: imageId }
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/portfolio/[slug]', 'page');

    return {
      success: true
    };

  } catch (error) {
    console.error('Delete project image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
