"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  uploadProjectImage, 
  deleteProjectImage, 
  getProjectImages, 
  updateProjectImageCaption 
} from "@/actions/storage";
import { Trash2, Edit2, Check, X } from "lucide-react";
import Image from "next/image";

interface ProjectImage {
  id: number;
  url: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectImageUploadProps {
  projectId: number;
  projectTitle: string;
}

export function ProjectImageUpload({ projectId, projectTitle }: ProjectImageUploadProps) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar imágenes existentes
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const projectImages = await getProjectImages(projectId);
        setImages(projectImages);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error("Error loading project images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [projectId]);

  const handleImageUpload = async (file: File | null, previewUrl?: string) => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      const result = await uploadProjectImage(file, projectId);
      
      if (result.success && result.url) {
        // Refrescar la lista de imágenes
        const updatedImages = await getProjectImages(projectId);
        setImages(updatedImages);
        toast.success("Image uploaded successfully!");
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

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const result = await deleteProjectImage(imageId);
      
      if (result.success) {
        setImages(images.filter(img => img.id !== imageId));
        toast.success("Image deleted successfully!");
      } else {
        toast.error(result.error || "Failed to delete image");
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("An error occurred while deleting the image");
    }
  };

  const startEditingCaption = (imageId: number, currentCaption: string | null) => {
    setEditingCaption(imageId);
    setCaptionValue(currentCaption || "");
  };

  const saveCaption = async (imageId: number) => {
    try {
      const result = await updateProjectImageCaption(imageId, captionValue);
      
      if (result.success) {
        setImages(images.map(img => 
          img.id === imageId 
            ? { ...img, caption: captionValue }
            : img
        ));
        setEditingCaption(null);
        setCaptionValue("");
        toast.success("Caption updated successfully!");
      } else {
        toast.error(result.error || "Failed to update caption");
      }
    } catch (error) {
      console.error('Caption update error:', error);
      toast.error("An error occurred while updating the caption");
    }
  };

  const cancelEditing = () => {
    setEditingCaption(null);
    setCaptionValue("");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            Loading images...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Images</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload images for {projectTitle}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Add New Image
          </Label>
          <ImageUpload
            onChange={handleImageUpload}
            disabled={isUploading}
            placeholder={isUploading ? "Uploading..." : "Click to upload project image"}
            showPreview={false}
            maxSize={10}
            className="max-w-md"
          />
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div>
            <Label className="text-base font-medium mb-3 block">
              Current Images ({images.length})
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
                >
                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={image.url}
                      alt={image.caption || "Project image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Action buttons overlay */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => startEditingCaption(image.id, image.caption)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteImage(image.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Caption Section */}
                  <div className="p-3">
                    {editingCaption === image.id ? (
                      <div className="space-y-2">
                        <Input
                          value={captionValue}
                          onChange={(e) => setCaptionValue(e.target.value)}
                          placeholder="Enter image caption..."
                          className="text-sm"
                        />
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={() => saveCaption(image.id)}
                            className="h-8 px-2"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEditing}
                            className="h-8 px-2"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-300 min-h-[1.25rem]">
                        {image.caption || (
                          <span className="italic text-gray-400">
                            No caption
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No images uploaded yet.</p>
            <p className="text-sm">Upload your first project image above.</p>
          </div>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Recommended size: 1200x800 pixels or larger</p>
          <p>• Supported formats: JPG, PNG, GIF</p>
          <p>• Maximum file size: 10MB</p>
          <p>• You can add captions to describe each image</p>
        </div>
      </CardContent>
    </Card>
  );
}
