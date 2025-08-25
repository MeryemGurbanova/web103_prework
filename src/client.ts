import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!URL || !API_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient(URL, API_KEY);
