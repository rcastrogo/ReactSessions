import { EditIcon, Menu, PlusIcon, Trash2 } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import Show from "./Show";
import { TableColumnsMenu, type ColumnMenuProp } from "./TableColumnsMenu";
import { cn } from "../../lib/utils";
import { data } from "react-router";

interface MenuItem {
  key: string,
  label: string,
  onClick?: () => void,
  icon?: React.ReactNode;
  enabledWhen?: (selected: Set<any>) => boolean;
}

interface TableMenuProps {
  itemsCount: number;
  selected: Set<string | number>;
  onAction: (action: string) => void;
  pageSize: number;
  menuItems: MenuItem[];
  columns: ColumnMenuProp[];
}

export const ACTIONS = {
  SELECT_ALL: 'select-all',
  CLEAR_ALL: 'clear-all',
  TOGGLE_COLUMN_PREFIX: 'toggle-column-',
  PAGE_SIZE_PREFIX: 'page-size-',
  INVERT_SELECTION: 'invert-selection',
  CHOOSE_SELECTION: 'show_only_selection',
  NEW: 'new',
  DELETE: 'delete',
  EDIT: 'edit',
} as const;

export const MENU_SEPARATOR_KEY = 'separator';


export function TableMenu({
  itemsCount = 0,
  selected = new Set(),
  onAction,
  pageSize = 10,
  menuItems = [],
  columns,
}: TableMenuProps) {
  console.log('tableMenu -> Render');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
          <span className="sr-only">Abrir menú</span>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" alignOffset={0}>
        <Show when={selected.size > 0} >
          <DropdownMenuLabel>{selected.size} elementos seleccionados</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </Show>
        <DropdownMenuGroup>
          <Show when={selected.size < itemsCount} >
            <DropdownMenuItem onClick={() => onAction?.(ACTIONS.SELECT_ALL)}>
              Seleccionar todo
            </DropdownMenuItem>
          </Show>
          <Show when={selected.size > 0} >
            <DropdownMenuItem onClick={() => onAction?.(ACTIONS.CLEAR_ALL)}>
              Limpiar selección
            </DropdownMenuItem>
          </Show>
          <Show when={selected.size > 0 && selected.size < itemsCount} >
            <DropdownMenuItem onClick={() => onAction?.(ACTIONS.INVERT_SELECTION)}>
              Invertir selección
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction?.(ACTIONS.CHOOSE_SELECTION)}>
              Solo seleccionados
            </DropdownMenuItem>
          </Show>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <TableColumnsMenu columns={columns} onToggleColumn={(key) => onAction?.(ACTIONS.TOGGLE_COLUMN_PREFIX + key)} />
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onAction?.(ACTIONS.NEW)}>
            <PlusIcon /> Insertar...
          </DropdownMenuItem>
          <DropdownMenuItem disabled={selected.size === 0} onClick={() => onAction?.(ACTIONS.DELETE)}>
            <Trash2 /> Borrar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={selected.size !== 1} onClick={() => onAction?.(ACTIONS.EDIT)}>
            <EditIcon /> Modificar...
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <div className="text-center text-xs font-semibold uppercase text-muted-foreground">Paginación</div>
          <DropdownMenuItem className="flex items-center p-2 gap-1">
            {[5, 10, 25, 50, 100].map(value => (
              <DropdownMenuItem
                key={value}
                onSelect={() => onAction?.(ACTIONS.PAGE_SIZE_PREFIX + value)}
                className={cn('inline-block w-10 text-center text-sm border border-gray-300',
                  'focus:z-10 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500',
                  'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:!bg-blue-600',
                  {'bg-gray-800 dark:bg-gray-400 text-white hover:!bg-blue-600': pageSize === value })
                }
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <Show when={menuItems && menuItems.length > 0}>
          <DropdownMenuSeparator />
          {menuItems.map(item => (
            <Show when={item.key != MENU_SEPARATOR_KEY} fallback={<DropdownMenuSeparator />}>
              <DropdownMenuItem
                key={item.key}
                onSelect={() => item.onClick ? item.onClick() : onAction(item.key)}
                disabled={item.enabledWhen ? !item.enabledWhen(selected) : false}
              >
                {item.icon} {item.label}
              </DropdownMenuItem>
            </Show>
          ))}
        </Show>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}



