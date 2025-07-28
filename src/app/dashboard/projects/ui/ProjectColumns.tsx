"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { ProjectInterface } from "@/interfaces";
import { DataTableColumnHeader } from "@/components";
import { ActionsCell } from "./ActionsCell";

export const projectsColumns: ColumnDef<ProjectInterface>[] = [
  {
    accessorKey: "title",
    filterFn: (row: Row<ProjectInterface>, columnId: string, filterValue: string) => {
      const values = filterValue.toLowerCase().split(' ');
      return values.every(
        value => row.getValue<string>(columnId)
          .toLowerCase()
          .includes(value)
        );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),  },  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const project = row.original;
      return <ActionsCell project={project} />;
    },
  },
]