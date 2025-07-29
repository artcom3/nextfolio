"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteUserSkill } from "@/actions/dashboard/skills/delete-user-skill";
import { UserSkillInterface } from "@/interfaces";
import { CreateSkillDialog } from "./CreateSkillDialog";

interface SkillsManagementFormProps {
  initialSkills: UserSkillInterface[];
}

export function SkillsManagementForm({ initialSkills }: SkillsManagementFormProps) {
  const [userSkills, setUserSkills] = useState<UserSkillInterface[]>(initialSkills);
  const [removingSkill, setRemovingSkill] = useState<number | null>(null);

  const handleRemoveSkill = async (skillId: number) => {
    setRemovingSkill(skillId);
    try {
      const result = await deleteUserSkill(skillId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        // Remove the skill from local state
        setUserSkills(prev => prev.filter(skill => skill.skillId !== skillId));
      }
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to remove skill");
    } finally {
      setRemovingSkill(null);
    }
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const groupedSkills = userSkills.reduce((acc, userSkill) => {
    const category = userSkill.skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(userSkill);
    return acc;
  }, {} as Record<string, UserSkillInterface[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Your Skills</h3>
          <p className="text-sm text-muted-foreground">
            Manage your technical and professional skills
          </p>
        </div>
        <CreateSkillDialog />
      </div>

      {userSkills.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No skills added yet.</p>
          <p className="text-sm text-muted-foreground">Click "Create Skill" to get started!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                {formatCategory(category)}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((userSkill) => (
                  <Badge
                    key={userSkill.skillId}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1"
                  >
                    {userSkill.skill.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveSkill(userSkill.skillId)}
                      disabled={removingSkill === userSkill.skillId}
                    >
                      {removingSkill === userSkill.skillId ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 