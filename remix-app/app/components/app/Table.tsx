
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Table,
  TableBody as Tbody,
  TableCell as Td,
  TableHead as Th,
  TableHeader as Thead,
  TableRow as Tr,
} from '~/components/ui/table';

import { cn, getValueByPath, type NestedPaths } from '~/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { storage } from '../../lib/storageUtil';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, EditIcon, LoaderCircle, PlusIcon, RefreshCcw, Trash2 } from 'lucide-react';
import useAlertManager from '../../hooks/useAlert';
import Show from './Show';
import { ACTIONS, TableMenu } from './TableMenu';
import type { ColumnMenuProp } from './TableColumnsMenu';
import React from 'react';

interface Identifiable {
  id: string | number;
}

interface ActionHandlers<T> {
  onCreate?: (callback: (newItem: T) => void) => void;
  onDelete?: (ids: (string | number)[], callback: () => void) => void;
  onEdit?: (item: T, callback: (updatedItem: T) => void) => void;
  onCustomAction?: (action: string, payload?: any) => void;
}

type Column<T extends Identifiable> = {
  key: string;
  title: string;
  className?: string;
  resolver?: keyof T | ((item: T) => React.ReactNode) | NestedPaths<T>;
  sorter?: keyof T | ((a: T, b: T) => number) | NestedPaths<T>;
};

export interface ActionButtonProps {
  key: string,
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  show?: 'menu' | 'button' | 'both';
}

interface TableProps<T extends Identifiable> {
  id?: string;
  title?: string;
  entity?: string;
  dataSource: T[];
  initialPageSize?: number;
  columns: Column<T>[];
  enableDoubleClickEdit?: boolean;
  actionHandlers?: ActionHandlers<T>;
  buttons: ActionButtonProps[];
  waitingForRows: boolean;
}

type SortDirection = 'asc' | 'desc' | null;


const SkeletonRows = React.memo(function SkeletonRows({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={`skeleton-${r}`}>
          <td className="p-1">
            <div className="h-11 rounded-sm animate-pulse bg-gray-300 dark:bg-blue-950/30 flex items-center justify-center">
              <Input type="checkbox" className="size-4" disabled />
            </div>
          </td>
          {Array.from({ length: cols }).map((__, c) => (
            <td key={`skeleton-${r}-${c}`} className="px-1">
              <div className="h-11 rounded-sm animate-pulse bg-gray-300 dark:bg-blue-950/30" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
});

export const TablaPaginada = <T extends Identifiable>({
  id = 'paged-table',
  entity = 'Items',
  dataSource,
  initialPageSize = 10,
  columns,
  enableDoubleClickEdit,
  actionHandlers,
  buttons = [],
  waitingForRows = false,
}: TableProps<T>) => {

  const COLUMNS_CONFIG_STORAGE_KEY = `${id}.columns`;
  const PAGE_SIZE_STORAGE_KEY = `${id}.PageSize`;

  const { error, success, question, close } = useAlertManager();
  const [datos, setDatos] = useState<T[]>(dataSource ?? []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(() => initialPageSize);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [menuColumns, setMenuColumns] = useState<ColumnMenuProp[]>([])
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [term, setTerm] = useState('');

  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSelectedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    setDatos(dataSource ?? []);
    setSelected(new Set());
    setCurrentPage(1);
  }, [dataSource]);

  useEffect(() => {
    const value = storage.readValue<number>(PAGE_SIZE_STORAGE_KEY, 10);
    setPageSize(value);
    // ==============================================================================
    // Cofiguración de las columnas
    // ==============================================================================
    const saved = storage.readValue<ColumnMenuProp[]>(COLUMNS_CONFIG_STORAGE_KEY, [])
    if (saved.length > 0) {
      setMenuColumns(saved)
    } else {
      const defaults = columns.map(c => {
        return { key: c.key, label: c.title, visible: true };
      });
      setMenuColumns(defaults)
      storage.writeValue(COLUMNS_CONFIG_STORAGE_KEY, defaults)
    }
  }, [])

  // ===============================================================================
  // Columnas visibles
  // ===============================================================================
  const handleToggleColumn = (id: string) => {
    setMenuColumns((prev) => {
      const updated = prev.map((col) =>
        col.key === id ? { ...col, visible: !col.visible } : col
      )
      storage.writeValue(COLUMNS_CONFIG_STORAGE_KEY, updated)
      return updated
    })
  }

  const visibleColumns = useMemo(() => {
    return columns.filter(col =>
      menuColumns.some(mc => mc.key === col.key && mc.visible)
    );
  }, [columns, menuColumns]);

  //const skeletonRows = useMemo(() => {
  //  return Array.from({ length: pageSize }, () =>
  //    Array.from({ length: visibleColumns.length })
  //  );
  //}, [pageSize, visibleColumns]);

  //const getSkeletonRows = function () {
  //  return <>
  //    {skeletonRows.map((row, rowIndex) => (
  //      <tr key={`skeleton-${rowIndex}`} className="">
  //        <td className="p-1">
  //          <div className="h-11 rounded-sm animate-pulse bg-gray-300 dark:bg-blue-950/30">
  //            <Input type="checkbox" className="size-4 mt-4 ml-1"/>
  //          </div>
  //        </td>
  //        {row.map((_, colIndex) => (
  //          <td
  //            key={`skeleton-${rowIndex}-${colIndex}`}
  //            className="px-1"
  //          >
  //            <div className="h-11 rounded-sm animate-pulse bg-gray-300 dark:bg-blue-950/30"></div>
  //          </td>
  //        ))}
  //      </tr>
  //    ))}
  //  </>
  //}

  // ===============================================================================
  // Filtrado de elementos
  // ===============================================================================
  //const filteredRows = useMemo(() => {
  //  if (!term.trim()) return datos;
  //  const lower = term.toLowerCase();
  //  const items = datos.filter(item => {
  //    for (const column of visibleColumns) {
  //      const value = getValueByPath(item, column.key);
  //      if (value && value.toString().toLowerCase().includes(lower)) {
  //        return true;
  //      }
  //    }
  //    return false;
  //  });
  //  const newSel = items.filter(item => selected.has(item.id)).map(item => item.id);
  //  setSelected(new Set(newSel));
  //  return items;
  //}, [term, datos, visibleColumns]);
  const filteredRows = useMemo(() => {
    if (!term.trim()) return datos;
    const lower = term.toLowerCase();
    return datos.filter(item =>
      visibleColumns.some(col => {
        const value = getValueByPath(item, col.key);
        return value?.toString().toLowerCase().includes(lower);
      })
    );
  }, [term, datos, visibleColumns]);

  useEffect(() => {
    setSelected(prev => {
      const valid = filteredRows.filter(item => prev.has(item.id)).map(i => i.id);
      return new Set(valid);
    });
  }, [filteredRows]);

  // ===============================================================================
  // Ordenación de elementos
  // ===============================================================================
  const sortedRows = useMemo(() => {
    if (!sortedColumn || !sortDirection) return filteredRows;
    const column = columns.find(c => c.key === sortedColumn);
    if (!column || !column.sorter) return filteredRows;
    let sorterFunction: (a: T, b: T) => number;
    if (typeof column.sorter === 'function') {
      sorterFunction = column.sorter;
    } else {
      const path = column.sorter as string;
      sorterFunction = (a, b) => {
        const valA = getValueByPath(a, path);
        const valB = getValueByPath(b, path);
        // Handle null or undefined
        if (valA == null && valB == null) return 0;
        if (valA == null) return -1;
        if (valB == null) return 1;
        // If both values are strings, use localeCompare
        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB, undefined, { sensitivity: 'base' });
        }
        // Otherwise, do normal comparison (numbers, booleans, etc.)
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      };
    }
    const sorted = [...filteredRows].sort((a, b) => {
      return sortDirection === 'asc' ? sorterFunction(a, b) : sorterFunction(b, a);
    });
    return sorted;
  }, [sortedColumn, sortDirection, filteredRows, columns]);

  const handleSort = (column: string) => {
    if (sortedColumn === column) {
      setSortDirection(prev => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // ===============================================================================
  // Lógica de Paginación
  // ===============================================================================
  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const lastIndex = currentPage * pageSize;
  const firtsIndex = lastIndex - pageSize;
  const rows = sortedRows.slice(firtsIndex, lastIndex);
  const goToFirtsPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);
  const handleCurrentPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = ~~e.target.value;
    if (valor >= 1 && valor <= totalPages) {
      setCurrentPage(valor);
    }
  };
  const handlePageSizeChange = (value: number): void => {
    setPageSize(value);
    storage.writeValue(PAGE_SIZE_STORAGE_KEY, value);
    setCurrentPage(1);
  };

  // Asegurar que la página actual no exceda el total de páginas
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [datos, totalPages, currentPage]);

  // ================================================================================
  // Lógica de Selección
  // ================================================================================
  //const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
  const handleSelectRow = (id: string | number, checked: boolean) => {
    setSelected(prev => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const ids = new Set(sortedRows.map(item => item.id));
      setSelected(ids);
    } else {
      setSelected(new Set());
    }
  };

  const handleInvertSelection = () => {
    setSelected(prev => {
      const targets = new Set<number | string>();
      sortedRows.forEach(item => {
        if (!prev.has(item.id)) targets.add(item.id);
      });
      return targets;
    });
  };

  // ===============================================================================================
  // Insertar
  // ===============================================================================================
  const handleInsertar = () => {
    actionHandlers?.onCreate?.((result) => {
      if (result) {
        setDatos(prev => [...prev, result]);
        const page = Math.ceil((datos.length + 1) / pageSize);
        if (currentPage !== page) setCurrentPage(page);
      }
    });
  };

  // ================================================================================================
  // Borrar
  // ================================================================================================
  const handleDeleteSelected = async () => {
    if (selected.size === 0) return;
    const message = `¿Está seguro de eliminar permanentemente ${selected.size} registro(s) seleccionado(s)?`;
    question(message, {
      title: 'Eliminar elementos',
      onAccept: () => {
        const ids = Array.from(selected.keys());
        actionHandlers?.onDelete?.(ids, () => {
          setDatos(prev => prev.filter(item => !selected.has(item.id)));
          setSelected(new Set());
        });
      },
      acceptLabel: 'Sí',
      closeLabel: 'No',
    });
  };

  // ================================================================================================
  // Editar
  // ================================================================================================
  const handleEditSelected = () => {
    if (selected.size !== 1) return;
    const id = selected.values().next().value;
    const target = datos.find(item => item.id === id);
    if (!target) return;
    actionHandlers?.onEdit?.(target, (result) => {
      const updated = { ...target, ...result };
      setDatos(prev => prev.map(i => (i.id === id ? updated : i)));
    });
  };

  // ================================================================================================
  // Actualizar
  // ================================================================================================
  const handleRefresh = () => {
    setSelected(new Set());
    actionHandlers?.onCustomAction?.('reload-data');
    goToFirtsPage();
  }

  const handleRowClick = (e: React.MouseEvent, index: number, id: string | number) => {
    const isCtrl = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    e.preventDefault();

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      return;
    }

    clickTimer.current = setTimeout(() => {
      setSelected(prev => {
        const next = new Set(prev);
        if (isShift && lastSelectedIndexRef.current !== null) {
          const start = Math.min(lastSelectedIndexRef.current, index);
          const end = Math.max(lastSelectedIndexRef.current, index);
          for (let i = start; i <= end; i++) {
            next.add(rows[i].id);
          }
        } else if (isCtrl) {
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          lastSelectedIndexRef.current = index;
        } else {
          if (next.has(id) && next.size === 1) {
            next.clear();
          } else {
            next.clear();
            next.add(id);
          }
          lastSelectedIndexRef.current = index;
        }
        return next;
      });
      clickTimer.current = null;
    }, 200);
  };

  const onDoubleClick = (e: any, item: T) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    if (enableDoubleClickEdit) {
      actionHandlers?.onEdit?.(item, (result) => {
        const updated = { ...item, ...result };
        setDatos(prev => prev.map(i => (i.id === item.id ? updated : i)));
      });
    }
  }

  const handleMenuAction = useCallback(
    (action: string) => {
      if (action == ACTIONS.SELECT_ALL) handleSelectAll(true);
      else if (action == ACTIONS.UNSELECT_ALL) handleSelectAll(false);
      else if (action == ACTIONS.INVERT_SELECTION) handleInvertSelection();
      else if (action == ACTIONS.NEW) handleInsertar();
      else if (action == ACTIONS.DELETE) handleDeleteSelected();
      else if (action == ACTIONS.EDIT) handleEditSelected();
      else if (action.startsWith(ACTIONS.PAGE_SIZE_PREFIX)) handlePageSizeChange(~~action.split('-')[2]);
      else if (action.startsWith(ACTIONS.TOGGLE_COLUMN_PREFIX)) handleToggleColumn(action.split('-')[2]);
      else actionHandlers?.onCustomAction?.(action, selected);
    },
    [
      actionHandlers,
      handleDeleteSelected,
      handleEditSelected,
      handleInsertar,
      handleInvertSelection,
      handleSelectAll,
      handleToggleColumn,
      selected,
    ]
  );

  const resolveCellValue = useCallback(
    (column: Column<T>, item: T) => {
      if (!column.resolver) return getValueByPath(item, column.key);
      if (typeof column.resolver === 'function') return column.resolver(item);
      if (typeof column.resolver === 'string') {
        if (column.resolver.includes('.')) {
          return getValueByPath(item, column.resolver);
        }
        return item[column.resolver as keyof T];
      }
      return null;
    }, []);

  console.log('table -> Render');

  return (
    <div>
      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center justify-between gap mt-1 border-b-1 pt-1 pb-1 mb-1 ">
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-1">
            <span className="truncate">
              {entity}: {datos.length} elementos
              {filteredRows.length !== datos.length && ` (${filteredRows.length} filtrados/s)`}
              {selected.size > 0 && ` (${selected.size} seleccionado/s)`} - Página{' '}
              <span className="">{currentPage} / {totalPages}</span>
            </span>
          </div>
        </div>
        {/* Botones de acción y paginación */}
        <div className="flex items-center gap-1 mt-2">
          <div className="hidden md:flex items-center gap-1">
            <div className="hidden md:flex flex-1">
              <Input
                type="text"
                className="flex-1"
                placeholder="Buscar por texto..."
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button className={cn('px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50',
                                    {'!bg-gray-200 dark:!bg-blue-800' : waitingForRows })}
              variant={"outline"}
              title="Cargar"
              onClick={handleRefresh}>
              <RefreshCcw className={waitingForRows ? 'animate-spin' : ''} />
            </Button>
            <Button
              variant={"outline"}
              title="Insertar"
              onClick={handleInsertar}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <PlusIcon />
            </Button>
            <Button
              variant={"outline"}
              title="Eliminar"
              onClick={handleDeleteSelected}
              disabled={selected.size === 0}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <Trash2 />
            </Button>
            <Button
              variant={"outline"}
              title="Editar"
              onClick={handleEditSelected}
              disabled={selected.size !== 1}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <EditIcon />
            </Button>
            {/* Botones Customizados */}
            {buttons.map((action, index) => (
              <Show when={action.show != 'menu'}>
                <Button
                  variant="outline"
                  key={`vis-${index}`}
                  onClick={() => action.onClick ? action.onClick() : handleMenuAction(action.key)}
                  className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  <Show when={!!action.icon}>{action.icon}</Show>
                  <Show when={!action.icon}>{action.label}</Show>
                </Button>
              </Show>
            ))}
          </div>
          {/* Botones de paginación */}
          <div className="flex items-center gap-1">
            <Button
              variant={"outline"}
              onClick={goToFirtsPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant={"outline"}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft />
            </Button>
            <Input
              className="w-12 text-center p-2 text-smº border-gray-200"
              value={currentPage}
              min="1"
              max={totalPages}
              onChange={handleCurrentPageChange}
              disabled={totalPages <= 1}
            />
            <Button
              variant={"outline"}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight />
            </Button>
            <Button
              variant={"outline"}
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronsRight />
            </Button>
            <TableMenu
              selected={selected}
              onAction={handleMenuAction}
              pageSize={pageSize}
              menuItems={buttons.filter(b => b.show === 'menu' || b.show === 'both')}
              columns={menuColumns}
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <Table className="table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <Thead className="">
            <Tr>
              <Th className="w-0 py-3 bg-gray-500 dark:bg-blue-900">
                <Input
                  type="checkbox"
                  className="size-4 mt-1"
                  onChange={e => handleSelectAll(e.target.checked)}
                  checked={selected.size === filteredRows.length && filteredRows.length > 0}
                  ref={el => {
                    if (el) {
                      el.indeterminate =
                        selected.size > 0 && selected.size < filteredRows.length;
                    }
                  }}
                />
              </Th>
              {visibleColumns.map(column => (
                <Th
                  key={column.key as string}
                  onClick={() => column.sorter && handleSort(column.key)}
                  className={
                    cn('min-w-[30px]',
                      'py-3 bg-gray-500 text-white dark:bg-blue-900 dark:text-gray-300',
                      column.className ?? '',
                      { 'cursor-pointer dark:hover:bg-blue-950 hover:bg-gray-700': column.sorter }
                    )}
                >
                  {column.title}
                  {sortedColumn === column.key && (
                    <span className={cn('inline-block align-text-bottom')}>
                      <Show when={sortDirection === 'asc'}>
                        <ChevronUp className="ml-1 text-white" style={{ height: '16px', width: '16px' }} />
                      </Show>
                      <Show when={sortDirection === 'desc'}>
                        <ChevronDown className="ml-1 text-white" style={{ height: '16px', width: '16px' }} />
                      </Show>
                    </span>
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Show when={waitingForRows}>
              <SkeletonRows rows={pageSize} cols={visibleColumns.length} />
            </Show>
            <Show when={rows && rows.length > 0}>
              {rows.map((item, index) => (
                <Tr
                  key={item.id}
                  className="even:bg-gray-200 odd:bg-white dark:odd:bg-black dark:even:bg-gray-950 data-[state=selected]:bg-blue-100 dark:data-[state=selected]:bg-blue-800"
                  data-state={selected.has(item.id) ? 'selected' : undefined}
                  onClick={(e) => handleRowClick(e, index, item.id)}
                  onDoubleClick={(e) => onDoubleClick(e, item)}
                >
                  <Td className="w-0">
                    <Input
                      type="checkbox"
                      className="size-4"
                      checked={selected.has(item.id)}
                      onClick={e => e.stopPropagation()}
                      onChange={e => handleSelectRow(item.id, e.target.checked)}
                    />
                  </Td>
                  {visibleColumns.map(column => (
                    <Td key={`${item.id}-${String(column.key)}`}
                      className={cn('', column.className ?? '')}
                    >
                      {resolveCellValue(column, item)}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Show>
          </Tbody>
        </Table>
      </div>
    </div>
  );
};
