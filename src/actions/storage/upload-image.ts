"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

interface UploadImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'images')
 * @param folder - Optional folder path within the bucket
 * @param fileName - Optional custom file name (will generate unique name if not provided)
 */
export async function uploadImage(
  file: File,
  bucket: string = "images",
  folder?: string,
  fileName?: string
): Promise<UploadImageResult> {
  try {
    const supabase = await createClient();

    // Generate unique filename if not provided
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const finalFileName = fileName || `${timestamp}_${randomId}.${fileExtension}`;
    
    // Create the full path
    const filePath = folder ? `${folder}/${finalFileName}` : finalFileName;

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Upload profile image and update user profile
 * @param file - The profile image file
 * @param userId - The user ID
 */
export async function uploadProfileImage(
  file: File,
  userId: string
): Promise<UploadImageResult> {
  try {
    // Verify user session
    const session = await auth();
    if (!session?.user?.id || session.user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Get current profile to check for existing image
    const currentProfile = await prisma.profile.findUnique({
      where: { userId },
      select: { profilePicture: true }
    });

    // Upload new image
    const uploadResult = await uploadImage(file, 'images', 'profiles');
    
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
        fullName: session.user.name || 'User', // Required field
        profilePicture: uploadResult.url
      }
    });

    // Delete old image if it exists and is from our storage
    if (currentProfile?.profilePicture && currentProfile.profilePicture.includes('supabase')) {
      try {
        const supabase = await createClient();
        const oldPath = currentProfile.profilePicture.split('/').slice(-2).join('/');
        await supabase.storage.from('images').remove([oldPath]);
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
    console.error('Profile image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Upload project image
 * @param file - The project image file
 * @param projectId - The project ID
 * @param caption - Optional image caption
 */
export async function uploadProjectImage(
  file: File,
  projectId: number,
  caption?: string
): Promise<UploadImageResult> {
  try {
    // Verify user session and project ownership
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Verify project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id
      }
    });

    if (!project) {
      return {
        success: false,
        error: 'Project not found or access denied'
      };
    }

    // Upload image
    const uploadResult = await uploadImage(file, 'images', 'projects');
    
    if (!uploadResult.success || !uploadResult.url) {
      return uploadResult;
    }

    // Save image record to database using Prisma
    await prisma.image.create({
      data: {
        projectId,
        url: uploadResult.url,
        caption: caption || null
      }
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/portfolio/[slug]', 'page');

    return {
      success: true,
      url: uploadResult.url
    };

  } catch (error) {
    console.error('Project image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
