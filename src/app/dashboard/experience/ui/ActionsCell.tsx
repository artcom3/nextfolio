"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { DeleteExperienceDialog } from "./DeleteExperienceDialog";
import { updateExperience } from "@/actions/dashboard/expirience/update-experience";
import { deleteExperience } from "@/actions/dashboard/expirience/delete-experience";

interface ActionsCellProps {
  experience: ExperienceInterface;
}

export function ActionsCell({ experience }: ActionsCellProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleSave = async (data: Partial<ExperienceInterface>) => {
    if (!experience.id) return;
    const result = await updateExperience(experience.id, data);
    if (!result.success) {
      throw new Error(result.message);
    }
  };

  const handleDeleteConfirm = async (id: number) => {
    const result = await deleteExperience(id);
    if (!result.success) {
      throw new Error(result.message);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditExperienceDialog
        experience={experience}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={handleSave}
      />

      <DeleteExperienceDialog
        experience={experience}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
}
