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
import { ProjectInterface } from "@/interfaces";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface DeleteProjectDialogProps {
  project: ProjectInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: number) => Promise<void>;
}

export function DeleteProjectDialog({
  project,
  open,
  onOpenChange,
  onDelete,
}: DeleteProjectDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!project.id) return;
    
    setIsLoading(true);
    try {
      await onDelete(project.id);
      toast.success("Project deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Error deleting project:", error);
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
            Delete Project
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {project.category?.replace(/_/g, ' ')} • {project.status?.replace(/_/g, ' ')}
            </p>
            {project.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {project.description}
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
