"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadProfileImage, deleteProfileImage, getProfileImageUrl } from "@/actions/storage";
import { Trash2 } from "lucide-react";

interface ProfileImageUploadProps {
  userId: string;
  initialImageUrl?: string | null;
}

export function ProfileImageUpload({ userId, initialImageUrl }: ProfileImageUploadProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Fetch current profile image if not provided
    if (!initialImageUrl && userId) {
      const fetchCurrentImage = async () => {
        try {
          const result = await getProfileImageUrl(userId);
          if (result.success && result.url) {
            setCurrentImageUrl(result.url);
          }
        } catch (error) {
          console.error('Error fetching current image:', error);
        }
      };
      fetchCurrentImage();
    }
  }, [userId, initialImageUrl]);

  const handleImageChange = async (file: File | null, previewUrl?: string) => {
    if (!file) {
      return;
    }

    setIsUploading(true);
    
    try {
      const result = await uploadProfileImage(file, userId);
      
      if (result.success && result.url) {
        setCurrentImageUrl(result.url);
        toast.success("Profile image updated successfully!");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("An error occurred while uploading the image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!currentImageUrl) return;

    setIsDeleting(true);
    
    try {
      const result = await deleteProfileImage(userId);
      
      if (result.success) {
        setCurrentImageUrl(null);
        toast.success("Profile image deleted successfully!");
      } else {
        toast.error(result.error || "Failed to delete image");
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("An error occurred while deleting the image");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Upload a profile picture that will be displayed on your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImageUpload
          value={currentImageUrl || undefined}
          onChange={handleImageChange}
          disabled={isUploading}
          placeholder={isUploading ? "Uploading..." : "Click to upload profile picture"}
          showPreview={true}
          rounded={true}
          maxSize={5}
          className="max-w-md"
        />
        
        {currentImageUrl && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDeleteImage}
              disabled={isDeleting || isUploading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? "Deleting..." : "Remove Picture"}
            </Button>
          </div>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>• Recommended size: 400x400 pixels or larger</p>
          <p>• Supported formats: JPG, PNG, GIF</p>
          <p>• Maximum file size: 5MB</p>
        </div>
      </CardContent>
    </Card>
  );
}
