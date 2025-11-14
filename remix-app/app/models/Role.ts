
import type { FunctionLanguageMap, LanguageMap } from './Language';
import type { LearningPath } from './LearningPath';
import type { Tag } from './Tag';

export type WebStatus = 'Error' | 'Changed' | 'New' | 'Unchanged';

export interface Role {
  id: number | null;
  name: LanguageMap;
  description: LanguageMap;
  functions: FunctionLanguageMap;
  //learning_paths: LearningPath[];
  //learningpath_order: number[];
  web_status?: WebStatus;
  tags?: Tag[];
  is_blocked: boolean;
}