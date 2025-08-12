"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Camera, Loader2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, url?: string) => void;
  disabled?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  placeholder?: string;
  showPreview?: boolean;
  rounded?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  accept = "image/*",
  maxSize = 5, // 5MB default
  className,
  placeholder = "Click to upload image",
  showPreview = true,
  rounded = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (file: File) => {
      setError(null);
      setIsLoading(true);

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        setIsLoading(false);
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        setIsLoading(false);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        setIsLoading(false);
        onChange(file, result);
      };
      reader.readAsDataURL(file);
    },
    [maxSize, onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length > 0) {
        handleFileSelect(imageFiles[0]);
      }
    },
    [disabled, handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showPreview && preview && (
        <div className="relative inline-block">
          <div className={cn(
            "relative overflow-hidden border-2 border-gray-200 dark:border-gray-700",
            rounded ? "rounded-full" : "rounded-lg",
            "w-32 h-32"
          )}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          "hover:border-gray-400 dark:hover:border-gray-600",
          isDragging && "border-blue-400 bg-blue-50 dark:bg-blue-950",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          "border-gray-300 dark:border-gray-700"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          ) : (
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
              {showPreview && preview ? (
                <Camera className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Upload className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          )}

          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {isLoading ? 'Processing...' : placeholder}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
