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
import { EducationInterface } from "@/interfaces/dashboard/education-interface";
import { EditEducationDialog } from "./EditEducationDialog";
import { DeleteEducationDialog } from "./DeleteEducationDialog";
import { updateEducation } from "@/actions/dashboard/education/update-education";
import { deleteEducation } from "@/actions/dashboard/education/delete-education";

interface ActionsCellProps {
  education: EducationInterface;
}

export function ActionsCell({ education }: ActionsCellProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleSave = async (data: Partial<EducationInterface>) => {
    if (!education.id) return;
    const result = await updateEducation(education.id, data);
    if (!result.success) {
      throw new Error(result.message);
    }
  };

  const handleDeleteConfirm = async (id: number) => {
    const result = await deleteEducation(id);
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

      <EditEducationDialog
        education={education}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={handleSave}
      />

      <DeleteEducationDialog
        education={education}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
} 