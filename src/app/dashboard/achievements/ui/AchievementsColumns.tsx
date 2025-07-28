"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components";
import { AchievementInterface } from "@/interfaces";
import { ActionsCell } from "./ActionsCell";

export const achievementsColumns: ColumnDef<AchievementInterface>[] = [
  {
    accessorKey: "title",
    filterFn: (row: Row<AchievementInterface>, columnId: string, filterValue: string) => {
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return description ? (
        <div className="max-w-[300px] truncate">
          {description}
        </div>
      ) : (
        <span className="text-muted-foreground">No description</span>
      );
    }
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => {
      const link = row.getValue("link") as string;
      return link ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate block max-w-[200px]"
        >
          {link}
        </a>      ) : (
        <span className="text-muted-foreground">No link</span>
      );
    }
  },
  {
    id: "actions",    header: "Actions",
    cell: ({ row }) => {
      const achievement = row.original;
      return <ActionsCell achievement={achievement} />;
    },
  },
];
