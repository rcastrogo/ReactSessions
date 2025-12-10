import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState, type InputHTMLAttributes } from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { IndeterminateProgressBar } from './Loading';
import Show from './Show';

export interface Suggestion {
  value: string;
  [key: string]: unknown;
}

interface AutoCompleteProps<T extends Suggestion>
  extends InputHTMLAttributes<HTMLInputElement> {
  searchProvider: (term: string) => Promise<T[]>;
  onResults?: (suggestion: Suggestion[]) => void;
  onLoading?: (loading:boolean) => void;
  onItemSelected?: (item: T) => void;
  onClear?: () => void;
  renderItem?: (item: T) => React.ReactNode;
  listHeight?: string;
  debounceTime?: number;
  minLength?: number;
}

const AutoComplete = <T extends Suggestion>({
  searchProvider,
  onResults,
  onLoading,
  onItemSelected,
  onClear,
  renderItem = item => <span>{item.value}</span>,
  listHeight = '200px',
  debounceTime = 300,
  minLength = 3,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ...rest
}: AutoCompleteProps<T>) => {

  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [isClosed, setIsClosed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);

  const debouncedSearch = useCallback(
    (term: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = window.setTimeout(async () => {
        try {
          setIsLoading(true);
          const results = await searchProvider(term);
          setSuggestions(results);
        } catch {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, debounceTime);
    },
    [debounceTime, searchProvider]
  );

  const performSearch = (term: string) => {
    if (onClear) onClear();

    if (!term || term.length < minLength) {
      setSuggestions([]);
      setCurrentFocus(-1);
      setIsClosed(true);
      return;
    }

    setIsClosed(false);
    debouncedSearch(term);
  };

  const handleSuggestionClick = (item: T) => {
    if (inputRef.current) inputRef.current.value = item.value;
    if (onItemSelected) onItemSelected(item);

    setSuggestions([]);
    setIsClosed(true);
  };

  useEffect(() => {
    if (onResults) onResults(suggestions);
  }, [onResults, suggestions]);

  useEffect(() => {
    onLoading?.(isLoading);
  }, [isLoading, onLoading]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Scroll into view
  useEffect(() => {
    if (currentFocus > -1 && listRef.current) {
      const item = listRef.current.children[currentFocus] as HTMLElement;
      item?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentFocus]);

  return (
    <div className="relative">
      <Input
        {...rest}
        autoComplete="off"
        ref={inputRef}
        onChange={(e) => {
          performSearch(e.target.value);
          externalOnChange?.(e);
        }}
        onBlur={(e) => {
          setTimeout(() => {
            if(!onResults) setSuggestions([]);
            setIsClosed(true);
          }, 150);
          externalOnBlur?.(e);
        }}
      />

      {/*<Show when={!!onResults && isLoading}>*/}
      {/*  <div*/}
      {/*    className={cn(*/}
      {/*      'absolute bg-background z-10 mt-2 w-full rounded-xl border p-3 shadow'*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    <div className="flex flex-col gap-2">*/}
      {/*      <Label>{t('general.action.loading')}</Label>*/}
      {/*      <IndeterminateProgressBar />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Show>*/}

      <Show when={onResults === undefined}>
        <div
          className={cn(
            'absolute bg-background z-10 mt-2 w-full rounded-xl border p-3 shadow',
            { hidden: isClosed }
          )}
        >
          {isLoading && (
            <div className="flex flex-col gap-2">
              <Label>{t('general.action.loading')}</Label>
              <IndeterminateProgressBar />
            </div>
          )}

          {!isLoading && suggestions.length === 0 && (
            <Label>{t('general.noResultsInTable')}</Label>
          )}

          {!isLoading && suggestions.length > 0 && (
            <div>
              <Label>{t('general.suggest_results', { count: suggestions.length })}</Label>

              <div
                ref={listRef}
                className="mt-2 flex flex-col gap-1 max-h-[200px] overflow-y-auto"
                style={{ maxHeight: listHeight }}
              >
                {suggestions.map((item, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    className={cn(
                      'justify-start',
                      i === currentFocus && 'bg-muted text-muted-foreground'
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {renderItem(item)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Show>

    </div>
  );
};

export default AutoComplete;
