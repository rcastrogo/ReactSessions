
import type { CategoryLanguageMap, LanguageMap } from './Language';
import type { Tag } from './Tag';

export type WebStatus = 'Error' | 'Changed' | 'New' | 'Unchanged';

export interface LearningPath {
  id: number;
  name: LanguageMap;
  description?: LanguageMap;
  category?: CategoryLanguageMap | null;
  imagen_url?: string | File;
  modules?: [];
  module_order?: number[];
  web_status?: WebStatus;
  tags?: Tag[];
}