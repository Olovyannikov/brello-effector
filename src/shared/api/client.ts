import { createClient } from '@supabase/supabase-js';

import { Database } from './database.types.ts';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
