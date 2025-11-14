import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState, type InputHTMLAttributes } from 'react';
import { useFetcher, type HTMLFormMethod } from 'react-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { IndeterminateProgressBar } from './Loading';

const DEFAULT_SEARCH_METHOD: HTMLFormMethod = 'POST';
const DEFAULT_SEARCH_INTENT = 'suggest';
const DEFAULT_SEARCH_RESULTS = 20;
const DEFAULT_SEARCH_LENGTH = 3;

interface Suggestion {
  value: string;
  [key: string]: string;
}

// =====================================================================================
// AutoCompleteControl
// =====================================================================================
interface AutoCompleteProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  onItemSelected?: (item: T) => void;
  onClear?: () => void;
  renderItem?: (item: T) => React.ReactNode;
  listHeight?: string;
  debounceTime?: number;
  searchAction?: string;
  searchIntent?: string;
  searchResults?: number;
  searchDataSource?: T[];
  searchLength?: number;
}
// =========================================
// fetchSuggestions
// =========================================
const fetchSuggestions = (
  fetcher: ReturnType<typeof useFetcher>,
  term: string,
  results: number = DEFAULT_SEARCH_RESULTS,
  action: string = './',
  intent: string = DEFAULT_SEARCH_INTENT,
  method: HTMLFormMethod = DEFAULT_SEARCH_METHOD
) => {
  if (term.length) {
    fetcher.submit(
      {
        _action: intent,
        intent: intent,
        results: results,
        query: term,
      },
      {
        method: method,
        action: action,
      }
    );
  }
};

const AutoComplete = <T extends Suggestion>({
  onItemSelected,
  onClear,
  renderItem = (item: Suggestion) => <span>{item.value}</span>,
  listHeight = '200px',
  debounceTime = 300,
  searchAction = './',
  searchIntent = DEFAULT_SEARCH_INTENT,
  searchResults = DEFAULT_SEARCH_RESULTS,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  searchDataSource = [],
  searchLength = DEFAULT_SEARCH_LENGTH,
  ...rest
}: AutoCompleteProps<T>) => {
  const fetcher = useFetcher<{ suggestions: Suggestion[] }>();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [isClosed, setIsClosed] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<number | null>(null);

  const debouncedSearch = useCallback(
    (term: string) => {
      if (debounceTimeoutRef.current !== null) clearTimeout(debounceTimeoutRef.current);
      const newTimeoutId = window.setTimeout(() => {
        if (searchDataSource && searchDataSource.length > 0) {
          const localResults = searchDataSource
            .filter(item => item.value.toLowerCase().includes(term.toLowerCase()))
            .slice(0, searchResults);
          fetcher.state = 'loading';
          setTimeout(() => {
            setSuggestions(localResults);
            fetcher.state = 'idle';
          }, 800);
          setSuggestions([]);
          return;
        }
        fetchSuggestions(fetcher, term, searchResults, searchAction, searchIntent);
      }, debounceTime);
      debounceTimeoutRef.current = newTimeoutId;
    },
    [debounceTime, fetcher, searchAction, searchResults, searchIntent, searchDataSource]
  );

  // ============================================================================
  // handleKeyDown
  // ============================================================================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (e.key === 'Escape') {
      e.preventDefault();
      setSuggestions([]);
      setIsClosed(true);
      return;
    }
    if (e.key === 'Tab') {
      setSuggestions([]);
      setIsClosed(true);
      return;
    }
    if (key === 'ArrowDown') {
      if (isClosed && inputRef.current) search(inputRef.current.value);
      e.preventDefault();
      setCurrentFocus(Math.min(currentFocus + 1, suggestions.length - 1));
      return;
    }
    if (key === 'ArrowUp') {
      e.preventDefault();
      setCurrentFocus(Math.max(currentFocus - 1, 0));
    }
    if (key === 'Enter') {
      if (currentFocus > -1) handleSuggestionClick(suggestions[currentFocus] as T);
      e.preventDefault();
      setIsClosed(true);
      return;
    }
  };

  // ========================================================================
  // handleInputChange
  // ========================================================================
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
    if (externalOnChange) externalOnChange(event);
  };

  // ========================================================================
  // handleOnBlur
  // ========================================================================
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setSuggestions([]);
    setIsClosed(true);
    if (externalOnBlur) externalOnBlur(event);
  };

  const search = (term: string) => {
    if (onClear) onClear();
    if (!term || (term && term.length < (searchLength || DEFAULT_SEARCH_LENGTH))) {
      setSuggestions([]);
      setCurrentFocus(-1);
      setIsClosed(true);
      return;
    }
    setIsClosed(false);
    try {
      debouncedSearch(term);
    } catch (error) {
      console.log(error);
      setSuggestions([]);
      setCurrentFocus(-1);
      setIsClosed(true);
    }
  };

  const handleSuggestionClick = (item: T) => {
    if (inputRef.current) inputRef.current.value = item.value;
    if (onItemSelected) onItemSelected(item);
    setSuggestions([]);
    setIsClosed(true);
  };

  // ==========================================================================
  // Dispose
  // ==========================================================================
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current !== null) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);
  // ==========================================================================
  // Scrolling Active Item into View
  // ==========================================================================
  useEffect(() => {
    if (currentFocus > -1 && listRef.current) {
      const target = listRef.current.children[currentFocus] as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentFocus]);
  // ==========================================================================
  // Suggestions
  // ==========================================================================
  useEffect(() => {
    if (fetcher.data?.suggestions) setSuggestions(fetcher.data.suggestions);
  }, [fetcher.data]);
  // ==========================================================================
  // Set current suggestion
  // ==========================================================================
  useEffect(() => {
    setCurrentFocus(suggestions.length ? 0 : -1);
  }, [suggestions]);

  const isLoading = fetcher.state !== 'idle';
  return (
    <div className="relative">
      <Input
        {...rest}
        autoComplete="off"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={e => handleOnBlur(e)}
        ref={inputRef}
        aria-haspopup="listbox"
        aria-expanded={!isClosed}
      />
      <div
        className={cn('bg-background absolute z-10 mt-2 w-full rounded-2xl border p-3', {
          hidden: isClosed,
        })}
        role="listbox"
        aria-label="Suggestions"
      >
        <div
          className={cn('flex flex-col gap-2', {
            hidden: !isLoading,
          })}
        >
          <Label>{t('general.action.loading')}</Label>
          <div className="grow">{isLoading && <IndeterminateProgressBar />}</div>
        </div>
        <div className={cn('mb-1', { hidden: isLoading || suggestions.length > 0 })}>
          <Label>{t('general.noResultsInTable')}</Label>
        </div>
        <div className={cn('mb-1 pl-2', { hidden: suggestions.length == 0 || isLoading })}>
          {suggestions.length > 0 && (
            <Label>{t('general.suggest_results', { count: suggestions.length })}</Label>
          )}
        </div>
        <div
          className={cn('flex w-full flex-wrap gap-2 overflow-y-auto', {
            'p-2': suggestions.length >= 0,
            'rounded-md border': !isLoading && suggestions.length > 0,
            '': isLoading,
          })}
          ref={listRef}
          style={{ maxHeight: listHeight || '200px' }}
        >
          {!isLoading &&
            suggestions.length > 0 &&
            suggestions.map((item, index) => (
              <Button
                type="button"
                role="option"
                variant="outline"
                key={index}
                data-index={index}
                className={cn(
                  'hover:bg-muted w-full cursor-pointer justify-start rounded border p-2 text-left',
                  {
                    'bg-muted text-muted-foreground': index === currentFocus,
                  }
                )}
                onClick={() => {
                  handleSuggestionClick(item as T);
                }}
                onMouseDown={e => e.preventDefault()}
              >
                {renderItem(item as T)}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
