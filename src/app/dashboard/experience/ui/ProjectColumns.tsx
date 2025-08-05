"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components";
import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";
import { ActionsCell } from "./ActionsCell";


export const experiencesColumns: ColumnDef<ExperienceInterface>[] = [
  {
    accessorKey: "role",
    filterFn: (row: Row<ExperienceInterface>, columnId: string, filterValue: string) => {
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
    },  },
  {
    id: "skills",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skills" />
    ),
         cell: ({ row }) => {
       const experience = row.original;
       return experience.id ? (
         <div>Skills will be managed via server-side data</div>
       ) : null;
     },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const experience = row.original;
      return <ActionsCell experience={experience} />;
    },
  },
]