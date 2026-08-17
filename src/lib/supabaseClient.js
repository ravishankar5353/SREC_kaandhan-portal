// ─── Supabase Client ────────────────────────────────────────────────────────
// Add your credentials to a .env file in the project root:
//   VITE_SUPABASE_URL=https://your-project-id.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key-here
//
// If credentials are missing, the app automatically uses mock data.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Flag used by services to decide between Supabase and mock data
export const isMockMode = !supabaseUrl || !supabaseAnonKey;

let supabase = null;

if (!isMockMode) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
export default supabase;
