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
  },
  db: {
    schema: 'public'
  }
});

// Test the connection
supabase.from('deadlines').select('*').limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connected successfully. Sample data:', data);
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
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}