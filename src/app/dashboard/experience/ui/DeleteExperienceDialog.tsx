"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface DeleteExperienceDialogProps {
  experience: ExperienceInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: number) => Promise<void>;
}

export function DeleteExperienceDialog({
  experience,
  open,
  onOpenChange,
  onDelete,
}: DeleteExperienceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!experience.id) return;
    
    setIsLoading(true);
    try {
      await onDelete(experience.id);
      toast.success("Experience deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete experience");
      console.error("Error deleting experience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            Delete Experience
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this experience? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {experience.role}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {experience.company}
            </p>
            {experience.startDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(experience.startDate).toLocaleDateString("en-US", { 
                  year: "numeric", 
                  month: "short" 
                })} - {experience.endDate 
                  ? new Date(experience.endDate).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "short" 
                    })
                  : "Present"
                }
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
