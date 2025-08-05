"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Wrench, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addExperienceSkill } from "@/actions/dashboard/experience/add-experience-skill";
import { removeExperienceSkill } from "@/actions/dashboard/experience/remove-experience-skill";
import { UserSkillInterface, ExperienceToolInterface } from "@/interfaces";

interface ManageExperienceSkillsDialogProps {
  experienceId: number;
  experienceTitle: string;
  userSkills: UserSkillInterface[];
  experienceSkills: ExperienceToolInterface[];
}

export function ManageExperienceSkillsDialog({ 
  experienceId, 
  experienceTitle,
  userSkills,
  experienceSkills
}: ManageExperienceSkillsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Set<number>>(new Set());
  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle dialog close to trigger data refresh
  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    // If dialog is being closed, refresh the data
    if (!isOpen) {
      router.refresh();
    }
  };

  useEffect(() => {
    // Initialize selected skills only when dialog opens
    if (open) {
      const currentSkillIds = new Set(experienceSkills.map(es => es.skillId));
      setSelectedSkills(currentSkillIds);
    }
  }, [open, experienceSkills]);

  const handleAddSkill = async () => {
    if (!selectedSkillToAdd) return;
    
    const skillId = parseInt(selectedSkillToAdd);
    setLoading(true);
    
    try {
      const result = await addExperienceSkill(experienceId, skillId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        // Update local state immediately to keep dialog open
        setSelectedSkills(prev => new Set([...prev, skillId]));
        setSelectedSkillToAdd(""); // Clear dropdown for next selection
        // Do NOT close dialog - keep it open for multiple additions
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (skillId: number) => {
    setLoading(true);
    try {
      const result = await removeExperienceSkill(experienceId, skillId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        // Update local state immediately to keep dialog open
        setSelectedSkills(prev => {
          const newSet = new Set(prev);
          newSet.delete(skillId);
          return newSet;
        });
        // Do NOT close dialog - keep it open for multiple operations
      }
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to remove skill");
    } finally {
      setLoading(false);
    }
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get available skills (user skills not already associated with this experience)
  const availableSkills = userSkills.filter(skill => !selectedSkills.has(skill.skillId));

  // Get current experience skills with full skill data
  const currentExperienceSkills = userSkills.filter(skill => selectedSkills.has(skill.skillId));

  // Group available skills by category for the dropdown
  const groupedAvailableSkills = availableSkills.reduce((acc, userSkill) => {
    const category = userSkill.skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(userSkill);
    return acc;
  }, {} as Record<string, UserSkillInterface[]>);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Wrench className="h-4 w-4" />
          <span className="ml-1 text-xs">{experienceSkills.length}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Experience Skills</DialogTitle>
          <DialogDescription>
            Add or remove skills for {experienceTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Current Skills Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Current Skills ({currentExperienceSkills.length})</Label>
            {currentExperienceSkills.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                No skills associated with this experience yet
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg min-h-[60px]">
                {currentExperienceSkills.map((userSkill) => (
                  <Badge
                    key={userSkill.skillId}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5"
                  >
                    <span>{userSkill.skill.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveSkill(userSkill.skillId)}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Add New Skill Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Add Skill</Label>
            {availableSkills.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                All your skills are already associated with this experience! 🎉
              </div>
            ) : (
              <div className="flex gap-3">
                <Select value={selectedSkillToAdd} onValueChange={setSelectedSkillToAdd}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill to add..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {Object.entries(groupedAvailableSkills).map(([category, skills]) => (
                      <div key={category}>
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50">
                          {formatCategory(category)}
                        </div>
                        {skills.map((userSkill) => (
                          <SelectItem key={userSkill.skillId} value={userSkill.skillId.toString()}>
                            {userSkill.skill.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleAddSkill}
                  disabled={!selectedSkillToAdd || loading}
                  size="sm"
                  className="shrink-0"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300">Quick Tips:</p>
                <ul className="mt-1 space-y-1 text-blue-700 dark:text-blue-400">
                  <li>• Skills help showcase your expertise for specific roles</li>
                  <li>• Add new skills from your profile page first</li>
                  <li>• Use relevant skills that match the experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 