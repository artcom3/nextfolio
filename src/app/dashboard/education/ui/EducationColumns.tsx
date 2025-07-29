"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components";
import { EducationInterface } from "@/interfaces/dashboard/education-interface";
import { ActionsCell } from "./ActionsCell";

export const educationColumns: ColumnDef<EducationInterface>[] = [
  {
    accessorKey: "degree",
    filterFn: (row: Row<EducationInterface>, columnId: string, filterValue: string) => {
      const values = filterValue.toLowerCase().split(' ');
      return values.every(
        value => row.getValue<string>(columnId)
          .toLowerCase()
          .includes(value)
        );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Degree" />
    ),
  },
  {
    accessorKey: "institution",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institution" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return type.charAt(0) + type.slice(1).toLowerCase().replace('_', ' ');
    },
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const education = row.original;
      return <ActionsCell education={education} />;
    },
  },
] 