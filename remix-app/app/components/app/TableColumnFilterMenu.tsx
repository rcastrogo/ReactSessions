import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Menu, Trash, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn, setFocus } from "../../lib/utils";
import { useDebounce } from "../../hooks/useDebounce";
import Show from "./Show";
import { Input } from "../ui/input";

export function TableColumnFilterMenu({
  columnLabel,
  values,
  selected,
  term,
  toggleValue,
  hideValues = false,
}: {
  columnLabel: string;
  values: string[];
  selected: string[];
  term: string;
  toggleValue: (value: string, term: string) => void;
  hideValues?: boolean
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(term);

  useEffect(() => setText(term), [term]);

  const debouncedToggleText = useDebounce((value: string) => {
    toggleValue("", value);
  }, 300);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setText(value);
      debouncedToggleText(value);
    },
    [debouncedToggleText]
  );

  const handleCheckboxChange = useCallback(
    (value: string) => toggleValue(value, text),
    [text, toggleValue]
  );

  const filteredValues = useMemo(() => {
    const normalizedText = text.trim().toLowerCase();
    let list = values.filter((value) => {
      const v = value.toLowerCase();
      return v.includes(normalizedText) || selected.includes(v)
    });
    list.sort((a, b) => {
      const aSel = selected.includes(a.toLowerCase());
      const bSel = selected.includes(b.toLowerCase());
      if (aSel === bSel) return 0;
      return aSel ? -1 : 1;
    });
    return list;
  }, [values, text, selected]);

  const hasActiveFilters = text.length + selected.length > 0;

  return (
    <DropdownMenu
      open={open}
      modal={false}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) setTimeout(() => inputRef.current?.focus(), 0);
      }}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-4 mt-1 rounded-none hover:bg-muted"
          onClick={(e) => e.stopPropagation()}
        >
          <Menu className="size-4" />
          <Show when={hasActiveFilters}>
            <span className="absolute left-3 -top-[2px] block h-2 w-2 rounded-sm bg-yellow-400" />
          </Show>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="p-1"
        align="end"
        side="bottom"
        sideOffset={10}
      >
        <div
          className="flex flex-col items-start gap-2 p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex py-1 text-sm border-b gap-1">
            <div className="flex-1">{columnLabel}</div>
            <Show when={hasActiveFilters}>
              <Button
                className="flex items-center gap-1 px-1 py-0 text-xs h-auto"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setText('');
                  toggleValue('~~~~', '');
                }}
              >
               <Trash className="size-3" /> Limpiar
              </Button>
            </Show>
            <Button
              className="flex items-center gap-1 px-1 py-0 text-xs h-auto"
              size="sm"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              <X className="size-3" />
            </Button>
          </div>

          {/* Input de búsqueda */}
          <span className="w-full text-sm">Buscar</span>
          <Input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full bg-background"
            data-radix-collection-item={false}
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Selector de valores */}
          <Show when={!hideValues}>
            <div className="flex text-sm w-full">
              <span className="flex-1">Valores</span>
              <Show when={selected.length > 0}>
                <span className="flex text-xs rounded-lg">{selected.length}/{values.length}</span>
              </Show>
            </div>
            <div
              className="w-full h-44 overflow-auto p-2 border rounded"
              data-radix-collection-item={false}
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {filteredValues.map((value, index) => {
                const normalized = (value || '').trim().toLowerCase();
                if (!normalized) return null;
                if (value === 'null') return null;
                return (
                  <DropdownMenuCheckboxItem
                    key={value}
                    checked={selected.includes(normalized)}
                    onCheckedChange={() => handleCheckboxChange(value)}
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer"
                  >
                    {value}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </div>
          </Show>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
