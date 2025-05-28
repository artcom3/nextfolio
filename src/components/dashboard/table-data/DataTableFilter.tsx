
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  filter: string;
}
 
export function DataTableFilter<TData>({
  table,
  filter,
}: DataTablePaginationProps<TData>) {
  return (
    <Input
      placeholder="Filter..."
      value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(filter)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
  
}