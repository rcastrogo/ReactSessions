/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import i18next, { t } from 'i18next';
import type { RefObject } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

const formatNumber = (value: number) => new Intl.NumberFormat(i18next.language).format(value);

export {
  getSafeFormData,
  resolveLocalizedKeys,
  createMap,
  setFocus,
  accentNumericComparer,
  normalizeNFD,
  getValueByPath,
  formatNumber
};
