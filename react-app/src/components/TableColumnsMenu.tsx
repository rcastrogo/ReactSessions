import {
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "~/components/ui/dropdown-menu"

export interface ColumnMenuProp {
  key: string
  label: string
  visible: boolean
}

export interface TableColumnsMenuProps{
  columns: ColumnMenuProp[]
  onToggleColumn: (key: string) => void
}

export function TableColumnsMenu({ columns, onToggleColumn }: TableColumnsMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {columns.map((col) => (
          <DropdownMenuCheckboxItem
            key={col.key}
            checked={col.visible}
            onCheckedChange={() => onToggleColumn(col.key)}
            onSelect={(e) => e.preventDefault()}
          >
            {col.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
