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
import { UserSkillInterface } from "@/interfaces";
import { deleteUserSkill } from "@/actions/dashboard/skills/delete-user-skill";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RemoveSkillDialogProps {
  userSkill: UserSkillInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveSkillDialog({
  userSkill,
  open,
  onOpenChange,
}: RemoveSkillDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      const result = await deleteUserSkill(userSkill.skillId);      if (result.error) {
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
          <DialogTitle>Remove Skill</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove &quot;{userSkill.skill.name}&quot; from your skills? This action
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
            onClick={handleRemove}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
