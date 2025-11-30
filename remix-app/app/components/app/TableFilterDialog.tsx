import React, { useState, useMemo, useCallback, useEffect } from "react";
import type { Column, Identifiable } from "./Table";
import { DialogLayout } from "./DialogLayout";
import { getValueByPath, normalizeNFD } from "../../lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDebounce } from "../../hooks/useDebounce";
import Show from "./Show";

interface TableFilterDialogProps<T extends Identifiable> {
  data: T[];
  columns: Column<T>[];
  onFilterChange?: (items: T[]) => void;
  onClose: () => void
  onApply: () => void
}

export default function TableFilterDialog<T extends Identifiable>({
  data,
  columns,
  onFilterChange,
  onClose,
  onApply,
}: TableFilterDialogProps<T>) {
  const [filterText, setFilterText] = useState("");
  const [searchType, setSearchType] = useState("contains");
  const [activeColumns, setActiveColumns] = useState(
    Object.fromEntries(columns.map((col) => [col.key, true]))
  );
  const [inputValue, setInputValue] = useState("");

  const debouncedFilter = useDebounce((value: string) => {
    setFilterText(value);
  }, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedFilter(value);
  };

  const handleColumnToggle = (col: string) => {
    setActiveColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  const matchesSearch = (text: string, search: string) => {
    const value = normalizeNFD(text);
    const query = normalizeNFD(search);

    switch (searchType) {
      case "starts":
        return value.startsWith(query);
      case "ends":
        return value.endsWith(query);
      case "exact":
        return text === search;
      default:
        return value.includes(query);
    }
  };

  const resolveCellValue = useCallback(
    (column: Column<T>, item: T): string | number | boolean | null => {
      if (column.accessor) {
        if (typeof column.accessor === "function") {
          return column.accessor(item);
        }
        return getValueByPath(item, column.accessor as string);
      }
      if (column.map && typeof column.map === "function") {
        const raw = getValueByPath(item, column.key);
        return column.map(raw);
      }
      return getValueByPath(item, column.key);
    },
    []
  );

  const filteredElements: T[] = useMemo(() => {
    if (!filterText.trim()) return [];
    return data
      .filter((row) =>
        columns.some(
          (col) =>
            activeColumns[col.key] &&
            matchesSearch(String(resolveCellValue(col, row)), filterText)
        )
      );
  }, [filterText, activeColumns, searchType, data]);

  const columnMatchesCount = useMemo(() => {
    if (!filterText.trim()) return {};
    const counts: Record<string, number> = {};
    columns.forEach((col) => {
      if (!activeColumns[col.key]) return;
      counts[col.key] = data.filter((row) =>
        matchesSearch(String(resolveCellValue(col, row)), filterText)
      ).length;
    });
    return counts;
  }, [filterText, activeColumns, searchType, data]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filteredElements);
    }
  }, [filteredElements, onFilterChange]);

  return (

    <DialogLayout
      open={true}
      onOpenChange={(open) => {
        if(!open) onClose();
      }}
      size="lg"
      className="h-[440px]"
      title="Búsqueda global"
      description=""
      footer={
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2"
          >
            Cerrar
          </Button>

          <Button
            onClick={() => onApply()}
            className="px-4 py-2"
            disabled={filteredElements.length === 0}
          >
            Aceptar
          </Button>
        </div>
      }
    >
    <div className="p-6">
      {/* Search input */}
      <Input
        type="text"
        placeholder="Escribe para buscar..."
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full p-3 mb-4"
      />

      {/* Search type */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="mb-4 p-2 w-full rounded-lg border"
      >
        <option value="contains">Contiene</option>
        <option value="starts">Empieza por</option>
        <option value="ends">Termina con</option>
        <option value="exact">Valor exacto</option>
      </select>

      {/* Column selection */}
      <div className="flex flex-wrap gap-4 mb-4 rounded-lg border p-2">
        {columns.map((col) => (
          <label key={col.key} className="flex items-center gap-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={activeColumns[col.key]}
              onChange={() => handleColumnToggle(col.key)}
              className="w-4 h-4 rounded"
            />
            <span className="">{col.title}</span>
            <Show when={columnMatchesCount[col.key] > 0}>
              <span className="text-xs text-gray-500">
                ({columnMatchesCount[col.key]})
              </span>
            </Show>

          </label>
        ))}
      </div>

      {/* Results */}
      <p className="mb-4 rounded-lg border p-2">
        {filteredElements.length} registro{filteredElements.length !== 1 ? "s" : ""}
      </p>
    </div>

    </DialogLayout>

  );
}
