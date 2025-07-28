"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components";
import { UserSkillInterface } from "@/interfaces";
import { ActionsCell } from "./ActionsCell";

export const skillsColumns: ColumnDef<UserSkillInterface>[] = [
  {
    accessorKey: "name",
    filterFn: (row: Row<UserSkillInterface>, columnId: string, filterValue: string) => {
      const values = filterValue.toLowerCase().split(' ');
      return values.every(
        value => row.getValue<string>(columnId)
          .toLowerCase()
          .includes(value)
        );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Name" />
    ),
    cell: ({ row }) => {
      return row.original.skill.name;
    }
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),    cell: ({ row }) => {
      return row.original.skill.category.replace(/_/g, ' ');
    }
  },
  {
    id: "actions",    header: "Actions",
    cell: ({ row }) => {
      const skill = row.original;
      return <ActionsCell userSkill={skill} />;
    },
  },
];
