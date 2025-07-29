"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components";
import { ExperienceWithSkillsInterface, UserSkillInterface } from "@/interfaces";
import { ActionsCell } from "./ActionsCell";
import { ManageExperienceSkillsDialog } from "./ManageExperienceSkillsDialog";
import { Badge } from "@/components/ui/badge";

interface ExperienceColumnsProps {
  userSkills: UserSkillInterface[];
}

export const createExperienceColumns = (userSkills: UserSkillInterface[]): ColumnDef<ExperienceWithSkillsInterface>[] => [
  {
    accessorKey: "role",
    filterFn: (row: Row<ExperienceWithSkillsInterface>, columnId: string, filterValue: string) => {
      const values = filterValue.toLowerCase().split(' ');
      return values.every(
        value => row.getValue<string>(columnId)
          .toLowerCase()
          .includes(value)
        );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      const startDate = row.getValue("startDate") as Date;
      return startDate ? new Date(startDate).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short" 
      }) : "N/A";
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      const endDate = row.getValue("endDate") as Date | null;
      return endDate ? new Date(endDate).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short" 
      }) : "Present";
    },
  },
  {
    id: "skills",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skills" />
    ),
    cell: ({ row }) => {
      const experience = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {experience.experienceTools.slice(0, 3).map((tool) => (
              <Badge key={tool.skillId} variant="secondary" className="text-xs">
                {tool.skill.name}
              </Badge>
            ))}
            {experience.experienceTools.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{experience.experienceTools.length - 3}
              </Badge>
            )}
          </div>
          <ManageExperienceSkillsDialog 
            experienceId={experience.id}
            experienceTitle={`${experience.role} at ${experience.company}`}
            userSkills={userSkills}
            experienceSkills={experience.experienceTools}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Convert back to the interface expected by ActionsCell
      const experience = {
        id: row.original.id,
        role: row.original.role,
        company: row.original.company,
        startDate: row.original.startDate,
        endDate: row.original.endDate,
        description: row.original.description,
        userId: row.original.userId,
        createdAt: row.original.createdAt,
        updatedAt: row.original.updatedAt,
      };
      return <ActionsCell experience={experience} />;
    },
  },
]; 