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
import { AchievementInterface } from "@/interfaces";
import { deleteAchievement } from "@/actions/dashboard/achievements/delete-achievement";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeleteAchievementDialogProps {
  achievement: AchievementInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAchievementDialog({
  achievement,
  open,
  onOpenChange,
}: DeleteAchievementDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteAchievement(achievement.id);      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        onOpenChange(false);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Achievement</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{achievement.title}&quot;? This action
            cannot be undone.
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
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
