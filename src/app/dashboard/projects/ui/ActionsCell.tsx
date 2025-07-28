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
import { ProjectInterface } from "@/interfaces";
import { EditProjectDialog } from "./EditProjectDialog";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { updateProject } from "@/actions/dashboard/projects/update-project";
import { deleteProject } from "@/actions/dashboard/projects/delete-project";

interface ActionsCellProps {
  project: ProjectInterface;
}

export function ActionsCell({ project }: ActionsCellProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleSave = async (data: Partial<ProjectInterface>) => {
    try {
      const result = await updateProject(project.id, {
        title: data.title,
        category: data.category,
        description: data.description,
        link: data.link,
        status: data.status,
      });

      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error; // Re-throw to let the dialog handle it
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const result = await deleteProject(id);

      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error; // Re-throw to let the dialog handle it
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
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setDeleteOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <EditProjectDialog
        project={project}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleSave}
      />
      
      <DeleteProjectDialog
        project={project}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDelete={handleDelete}
      />
    </>
  );
}
