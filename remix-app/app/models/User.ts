import type { LanguageMap } from './Language';

export type User = {
  das?: string | null;
  id: number;
  full_name?: string | null;
  email?: string | null;
  imagen_url?: string | null;
  line_manager?: number | null;
  current_role?: number | null;
  aspiring_role?: number | null;
  role_assigned_date?: string;
  created_at?: string;
  updated_at?: string;
  cv_url?: string | null;
  access_type?: 'User' | 'Admin' | string;
  aspiring_role_name?: LanguageMap;
  project?: string | null;
  dedication?: number | null;
  role_history?: number[];
};