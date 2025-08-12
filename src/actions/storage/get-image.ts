"use server";

import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

interface GetImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Get a signed URL for an image (useful for private buckets)
 * @param filePath - The file path in storage
 * @param bucket - The storage bucket name (default: 'images')
 * @param expiresIn - Expiration time in seconds (default: 3600 = 1 hour)
 */
export async function getSignedImageUrl(
  filePath: string,
  bucket: string = "images",
  expiresIn: number = 3600
): Promise<GetImageResult> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Get signed URL error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      url: data.signedUrl
    };

  } catch (error) {
    console.error('Get signed URL error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Get public URL for an image
 * @param filePath - The file path in storage
 * @param bucket - The storage bucket name (default: 'images')
 */
export async function getPublicImageUrl(
  filePath: string,
  bucket: string = "images"
): Promise<GetImageResult> {
  try {
    const supabase = await createClient();

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: data.publicUrl
    };

  } catch (error) {
    console.error('Get public URL error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Get profile image URL for a user
 * @param userId - The user ID
 */
export async function getProfileImageUrl(userId: string): Promise<GetImageResult> {
  try {
    // Get profile image using Prisma
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

    return {
      success: true,
      url: profile.profilePicture
    };

  } catch (error) {
    console.error('Get profile image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Get all images for a project
 * @param projectId - The project ID
 */
export async function getProjectImages(projectId: number) {
  try {
    // Get project images using Prisma
    const images = await prisma.image.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' }
    });

    return images;

  } catch (error) {
    console.error('Get project images error:', error);
    throw error;
  }
}

/**
 * Check if a file exists in storage
 * @param filePath - The file path in storage
 * @param bucket - The storage bucket name (default: 'images')
 */
export async function checkImageExists(
  filePath: string,
  bucket: string = "images"
): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(filePath.split('/').slice(0, -1).join('/'), {
        search: filePath.split('/').pop()
      });

    if (error) {
      return false;
    }

    return data && data.length > 0;

  } catch (error) {
    console.error('Check image exists error:', error);
    return false;
  }
}
