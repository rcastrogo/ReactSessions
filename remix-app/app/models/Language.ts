export const LANGUAGES = ['ES', 'EN'] as const;
export type Language = (typeof LANGUAGES)[number];

export type FunctionLanguageMap = Record<Language, string[]>;
export type LanguageMap = Record<Language, string>;
export type CategoryLanguageMap = Partial<Record<Language, string>> | null;
