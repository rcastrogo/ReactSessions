import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { t } from 'i18next';

import type { RefObject } from 'react';

interface ApiErrorResponse {
  success: boolean;
  error?: {
    message: string;
    details?: string;
    [key: string]: string | undefined;
  };
  [key: string]: string | boolean | object | undefined;
}

/**
 * Converts the contents of an HTML form into a plain JavaScript object.
 *
 * @param {HTMLFormElement} form - The HTML form element whose data should be extracted.
 * @returns {Record<string, FormDataEntryValue>} - An object where each key corresponds
 *   to a form field name, and each value is the associated field value (string or File).
 *
 * @example
 * // Given a form with fields:
 * // <input name="username" value="John" />
 * // <input type="file" name="avatar" />
 * const data = getFormDataAsObject(myForm);
 * // → { username: "John", avatar: File }
 */
const getFormDataAsObject = (form: HTMLFormElement): Record<string, FormDataEntryValue> => {
  return Object.fromEntries(new FormData(form).entries());
};

/**
 * Returns a sanitized object from a FormData instance, trimming whitespace
 * from string values and preserving file entries as-is.
 *
 * @param {FormData} formData - The FormData object to process.
 * @returns {Record<string, string>} - A key-value object containing cleaned string values.
 *   Non-string values (e.g., File objects) are left unchanged.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', '  Alice  ');
 * formData.append('cv_file', new File([], 'cv.pdf'));
 *
 * const safeData = getSafeFormData(formData);
 * // → { name: "Alice", cv_file: File }
 */
const getSafeFormData = (formData: FormData): Record<string, string> => {
  const entries = Array.from(formData.entries());
  const cleanedEntries = entries.map(([key, value]) => {
    if (typeof value === 'string') return [key, value.trim()];
    return [key, value];
  });
  return Object.fromEntries(cleanedEntries);
};

const PREFIX_API_ERROR_500 = 'API error: 500 Internal Server Error - ';
const PREFIX_API_ERROR_404 = 'API error: 404 Not Found - ';
const PREFIX_API_ERROR_422 = 'API error: 422 Unprocessable Entity - ';

/**
 * Parses an error string to determine if it's a structured API error response.
 * If the error string starts with a specific prefix indicating a 500 error,
 * it attempts to parse the remaining part of the string as a JSON object
 * representing an ApiErrorResponse. If parsing is successful, the function
 * returns the parsed ApiErrorResponse object. If parsing fails or the initial
 * prefix is not found, the function returns the original error string.
 *
 * @param value The error string to parse.
 * @returns An ApiErrorResponse object if the string is a valid API error,
 *          otherwise the original error string.
 */
function parseErrorString(value: string): ApiErrorResponse | string {
  let apiError = '';
  if (value.startsWith(PREFIX_API_ERROR_500)) apiError = PREFIX_API_ERROR_500;
  if (value.startsWith(PREFIX_API_ERROR_404)) apiError = PREFIX_API_ERROR_404;
  if (value.startsWith(PREFIX_API_ERROR_422)) apiError = PREFIX_API_ERROR_422;
  if (apiError) {
    const jsonString = value.substring(apiError.length);
    try {
      return JSON.parse(jsonString) as ApiErrorResponse;
    } catch (e) {
      return {
        success: false,
        error: {
          message: value.replace(apiError, '').trim(),
        },
      };
    }
  }
  return value;
}

/**
 * Translates and formats a comma-separated list of localization keys.
 *
 * @param {string} value - A string containing one or more localization keys separated by commas.
 * @returns {string} - A single string with all translated messages joined by newline characters.
 *
 * @example
 * // If the translation function `t()` resolves:
 * //  'error.name' → 'Invalid name'
 * //  'error.email' → 'Invalid email'
 * resolveLocalizedKeys('error.name,error.email');
 * // → "Invalid name\nInvalid email"
 */
function resolveLocalizedKeys(value: string): string {
  return (value || '')
    .split(',')
    .map(msg => t(msg))
    .join('\n');
}

/**
 * Focuses and scrolls to the first form control matching a given CSS selector.
 *
 * @param {string} locator - A valid CSS selector (e.g. '#email', 'input[name="das"]').
 * @param {RefObject<HTMLFormElement | null>} formRef - A React ref object pointing to the form element.
 *
 * The function waits briefly before focusing, to ensure the element is rendered and ready.
 *
 * @example
 * setFocus('#email', formRef);
 */
function setFocus(locator: string, formRef: RefObject<HTMLFormElement | null>) {
  const firstControl = formRef.current?.querySelector<HTMLElement>(locator);
  if (firstControl) {
    setTimeout(() => {
      firstControl.focus();
      firstControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }
}

/**
 * Creates a simple map (dictionary) from an array of objects.
 * Each entry maps `item[idKey]` → `item[nameKey]`.
 *
 * @template T
 * @param {T[]} array - The array of objects to convert.
 * @param {keyof T} [idKey='id'] - The property name to use as the key.
 * @param {keyof T} [nameKey='name'] - The property name to use as the value.
 * @returns {Record<string | number, string>} A map of IDs to names.
 *
 * @example
 * const roles = [
 *   { id: 1, name: "Developer" },
 *   { id: 2, name: "Manager" }
 * ];
 * const map = createMap(roles);
 * // map = { 1: "Developer", 2: "Manager" }
 */
function createMap(array: any[], idKey = 'id', nameKey = 'name'): { [k: string]: any; } {
  if (!Array.isArray(array)) return {};
  return Object.fromEntries(array.map(item => [item[idKey], getValueByPath(item , nameKey)]));
}

function getValueByPath (item: any, path: string): any {
  if (!path) return item.toString();
  const parts = path.split('.');
  let current: any = item;

  for (const part of parts) {
    if (current === null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

export type NestedPaths<T> = T extends object
  ? {
    [K in keyof T]-?: K extends string
    ? `${K}` | `${K}.${NestedPaths<T[K]>}`
    : never;
  }[keyof T]
  : '';

function accentNumericComparer(a: string, b: string){
  return a.localeCompare(b, undefined, { sensitivity: 'accent', numeric: true });
}

const normalizeNFD = (value: string) => {
  return value.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
}

export {
  getSafeFormData,
  parseErrorString,
  resolveLocalizedKeys,
  createMap,
  setFocus,
  accentNumericComparer,
  normalizeNFD,
  getValueByPath,
  PREFIX_API_ERROR_500,
  PREFIX_API_ERROR_404,
  PREFIX_API_ERROR_422,
};
