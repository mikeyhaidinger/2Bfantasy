import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Test the connection
supabase.from('deadlines').select('count', { count: 'exact', head: true })
  .then(({ error, count }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connected successfully. Deadlines table has', count, 'rows');
    }
  });

// Database types
export interface Deadline {
  id: string;
  type: 'trade' | 'keeper';
  deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface Matchup {
  id: string;
  week: number;
  matchup_id: string;
  team1: string;
  team2: string;
  writeup: string;
  prediction_winner: string | null;
  prediction_margin: number | null;
  created_at: string;
  updated_at: string;
}