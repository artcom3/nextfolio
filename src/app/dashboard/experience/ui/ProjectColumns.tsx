"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components";
import { ExperienceInterface } from "@/interfaces/dashboard/expirience-interface";

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
  // {
  //   accessorKey: "precioFerreteria",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="P. Ferreteria" />
  //   ),
  //   cell: info => currencyFormat(info.getValue() as number),
  // },
  // {
  //   accessorKey: "precioConstructora",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="P. Constructora" />
  //   ),
  //   cell: info => currencyFormat(info.getValue() as number),
  // },
  // {
  //   accessorKey: "precioTienda",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="P. Tienda" />
  //   ),
  //   cell: info => currencyFormat(info.getValue() as number),
  // },
  // {
  //   accessorKey: "stock",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Stock" />
  //   ),
  // },
  // {
  //   accessorKey: "inStore",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Publicado" />
  //   ),
  //   cell: ({row}) => {
  //     const inStore = row.getValue('inStore') as boolean;
      
  //     return (
  //       <div>
  //         <Badge variant="outline">{inStore ? 'activo': 'inactivo'}</Badge>
  //       </div>
  //     )

  //   },
  // },
  // {
  //   accessorKey: "webImagesCount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Images" />
  //   ),
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const product = row.original
 
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Acciones</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(product.id.toString())}
  //           >
  //             Copiar ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <Link href={`/admin/product/${product.id}`}>
  //             <DropdownMenuItem>
  //                 Editar
  //             </DropdownMenuItem>
  //           </Link>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]