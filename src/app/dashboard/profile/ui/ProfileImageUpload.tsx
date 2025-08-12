"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadProfileImage, deleteProfileImage, getProfileImageUrl } from "@/actions/storage";
import { Trash2, User } from "lucide-react";
import Image from "next/image";

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
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload a photo that represents you on your portfolio</CardDescription>
          </div>
          {currentImageUrl && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDeleteImage}
              disabled={isDeleting || isUploading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? "Deleting..." : "Remove"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Preview */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800 bg-muted flex items-center justify-center">
              {currentImageUrl ? (
                <Image src={currentImageUrl} alt="Current profile picture" fill className="object-cover" sizes="144px" />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">This is how your avatar will appear</p>
          </div>

          {/* Uploader */}
          <div className="lg:col-span-2 space-y-4">
            <ImageUpload
              value={currentImageUrl || undefined}
              onChange={handleImageChange}
              disabled={isUploading}
              placeholder={isUploading ? "Uploading..." : "Drag and drop or click to upload"}
              showPreview={false}
              rounded={true}
              maxSize={5}
            />

            <div className="text-xs text-muted-foreground">
              <p>• Recommended: 400×400px or larger</p>
              <p>• Formats: JPG, PNG, GIF • Max size: 5MB</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
