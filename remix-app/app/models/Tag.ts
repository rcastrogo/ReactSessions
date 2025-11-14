
export type Level = '' | 'Beginner' | 'Intermediate' | 'Advanced';

export const CATEGORY_TAGS = [
  'Protocol',
  'Functional',
  'Programming Language',
  'Framework',
  'Business Software',
  'Tool',
  'Technical',
  'Platform',
  'Method',
  'Norms and Standards',
  'Operating System',
  'Behavioral',
  'Cross Functional',
  'Database',
  'Language',
  'Product',
] as const;

export type CategoryTags = (typeof CATEGORY_TAGS)[number];

export type Tag = {
  id?: number;
  name: string;
  level: Level;
  category: CategoryTags;
};