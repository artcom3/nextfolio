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
import { EducationInterface } from "@/interfaces/dashboard/education-interface";
import { toast } from "sonner";

interface DeleteEducationDialogProps {
  education: EducationInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: number) => Promise<void>;
}

export function DeleteEducationDialog({
  education,
  open,
  onOpenChange,
  onDelete,
}: DeleteEducationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!education.id) return;
    
    setIsLoading(true);
    try {
      await onDelete(education.id);
      toast.success("Education deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete education");
      console.error("Error deleting education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Education</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{education.degree}&quot; from {education.institution}? 
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
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