/*
  # Fantasy Football League Database Schema

  1. New Tables
    - `deadlines`
      - `id` (uuid, primary key)
      - `type` (text) - 'trade' or 'keeper'
      - `deadline` (timestamptz) - the actual deadline date/time
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `matchups`
      - `id` (uuid, primary key)
      - `week` (integer) - week number (1-13)
      - `matchup_id` (text) - unique identifier like '1-1', '1-2', etc.
      - `team1` (text) - first team name
      - `team2` (text) - second team name
      - `writeup` (text) - commissioner analysis
      - `prediction_winner` (text) - predicted winning team
      - `prediction_margin` (numeric) - predicted point margin
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated write access (for commissioner editing)
*/

-- Create deadlines table
CREATE TABLE IF NOT EXISTS deadlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('trade', 'keeper')),
  deadline timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create matchups table
CREATE TABLE IF NOT EXISTS matchups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week integer NOT NULL CHECK (week >= 1 AND week <= 13),
  matchup_id text NOT NULL UNIQUE,
  team1 text NOT NULL,
  team2 text NOT NULL,
  writeup text DEFAULT 'Click edit to add commissioner analysis for this matchup...',
  prediction_winner text,
  prediction_margin numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchups ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read deadlines"
  ON deadlines
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read matchups"
  ON matchups
  FOR SELECT
  TO public
  USING (true);

-- Create policies for public write access (since this is a small league)
CREATE POLICY "Anyone can insert/update deadlines"
  ON deadlines
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert/update matchups"
  ON matchups
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deadlines_type ON deadlines(type);
CREATE INDEX IF NOT EXISTS idx_matchups_week ON matchups(week);
CREATE INDEX IF NOT EXISTS idx_matchups_matchup_id ON matchups(matchup_id);

-- Insert initial deadline records
INSERT INTO deadlines (type, deadline) VALUES 
  ('trade', '2025-12-04T20:15:00Z'),
  ('keeper', NULL)
ON CONFLICT DO NOTHING;

-- Insert initial matchup data for all weeks
INSERT INTO matchups (week, matchup_id, team1, team2) VALUES
  -- Week 1
  (1, '1-1', 'Team Gone Jawnson', 'Jersey Shore Supplements'),
  (1, '1-2', 'Maui Mooseknuckles', 'NJ Old School'),
  (1, '1-3', 'The Silverbacks', 'Calamari Ballsrings'),
  (1, '1-4', 'The Pancake Football Team', 'Zweeg'),
  (1, '1-5', 'Pink Sock', 'Sonalika Scorchers'),
  (1, '1-6', 'Maine Course', 'Central Saudi Scammers'),
  
  -- Week 2
  (2, '2-1', 'Team Gone Jawnson', 'NJ Old School'),
  (2, '2-2', 'Jersey Shore Supplements', 'Calamari Ballsrings'),
  (2, '2-3', 'Maui Mooseknuckles', 'Zweeg'),
  (2, '2-4', 'The Silverbacks', 'Sonalika Scorchers'),
  (2, '2-5', 'The Pancake Football Team', 'Pink Sock'),
  (2, '2-6', 'Central Saudi Scammers', 'Maine Course'),
  
  -- Week 3
  (3, '3-1', 'The Silverbacks', 'Jersey Shore Supplements'),
  (3, '3-2', 'Central Saudi Scammers', 'Sonalika Scorchers'),
  (3, '3-3', 'Zweeg', 'Maine Course'),
  (3, '3-4', 'Pink Sock', 'Calamari Ballsrings'),
  (3, '3-5', 'Team Gone Jawnson', 'Maui Mooseknuckles'),
  (3, '3-6', 'The Pancake Football Team', 'NJ Old School'),
  
  -- Week 4
  (4, '4-1', 'Pink Sock', 'Maui Mooseknuckles'),
  (4, '4-2', 'Jersey Shore Supplements', 'Maine Course'),
  (4, '4-3', 'The Silverbacks', 'The Pancake Football Team'),
  (4, '4-4', 'Calamari Ballsrings', 'Sonalika Scorchers'),
  (4, '4-5', 'NJ Old School', 'Central Saudi Scammers'),
  (4, '4-6', 'Zweeg', 'Team Gone Jawnson'),
  
  -- Week 5
  (5, '5-1', 'Calamari Ballsrings', 'Maine Course'),
  (5, '5-2', 'Pink Sock', 'NJ Old School'),
  (5, '5-3', 'The Silverbacks', 'Maui Mooseknuckles'),
  (5, '5-4', 'The Pancake Football Team', 'Jersey Shore Supplements'),
  (5, '5-5', 'Sonalika Scorchers', 'Team Gone Jawnson'),
  (5, '5-6', 'Central Saudi Scammers', 'Zweeg'),
  
  -- Week 6
  (6, '6-1', 'Calamari Ballsrings', 'The Pancake Football Team'),
  (6, '6-2', 'Team Gone Jawnson', 'Central Saudi Scammers'),
  (6, '6-3', 'Maine Course', 'Sonalika Scorchers'),
  (6, '6-4', 'Pink Sock', 'Zweeg'),
  (6, '6-5', 'NJ Old School', 'The Silverbacks'),
  (6, '6-6', 'Maui Mooseknuckles', 'Jersey Shore Supplements'),
  
  -- Week 7
  (7, '7-1', 'The Silverbacks', 'Zweeg'),
  (7, '7-2', 'Calamari Ballsrings', 'Maui Mooseknuckles'),
  (7, '7-3', 'The Pancake Football Team', 'Sonalika Scorchers'),
  (7, '7-4', 'Team Gone Jawnson', 'Maine Course'),
  (7, '7-5', 'Central Saudi Scammers', 'Pink Sock'),
  (7, '7-6', 'NJ Old School', 'Jersey Shore Supplements'),
  
  -- Week 8
  (8, '8-1', 'The Silverbacks', 'Central Saudi Scammers'),
  (8, '8-2', 'Maine Course', 'The Pancake Football Team'),
  (8, '8-3', 'NJ Old School', 'Calamari Ballsrings'),
  (8, '8-4', 'Pink Sock', 'Team Gone Jawnson'),
  (8, '8-5', 'Sonalika Scorchers', 'Maui Mooseknuckles'),
  (8, '8-6', 'Zweeg', 'Jersey Shore Supplements'),
  
  -- Week 9
  (9, '9-1', 'Jersey Shore Supplements', 'Central Saudi Scammers'),
  (9, '9-2', 'Team Gone Jawnson', 'The Pancake Football Team'),
  (9, '9-3', 'Maui Mooseknuckles', 'Maine Course'),
  (9, '9-4', 'Calamari Ballsrings', 'Zweeg'),
  (9, '9-5', 'NJ Old School', 'Sonalika Scorchers'),
  (9, '9-6', 'Pink Sock', 'The Silverbacks'),
  
  -- Week 10
  (10, '10-1', 'Team Gone Jawnson', 'The Silverbacks'),
  (10, '10-2', 'Jersey Shore Supplements', 'Pink Sock'),
  (10, '10-3', 'Central Saudi Scammers', 'Calamari Ballsrings'),
  (10, '10-4', 'Maine Course', 'NJ Old School'),
  (10, '10-5', 'Zweeg', 'Sonalika Scorchers'),
  (10, '10-6', 'Maui Mooseknuckles', 'The Pancake Football Team'),
  
  -- Week 11
  (11, '11-1', 'Jersey Shore Supplements', 'Sonalika Scorchers'),
  (11, '11-2', 'Calamari Ballsrings', 'Team Gone Jawnson'),
  (11, '11-3', 'NJ Old School', 'Zweeg'),
  (11, '11-4', 'Pink Sock', 'The Pancake Football Team'),
  (11, '11-5', 'Central Saudi Scammers', 'Maui Mooseknuckles'),
  (11, '11-6', 'The Silverbacks', 'Maine Course'),
  
  -- Week 12
  (12, '12-1', 'Team Gone Jawnson', 'Jersey Shore Supplements'),
  (12, '12-2', 'Maui Mooseknuckles', 'NJ Old School'),
  (12, '12-3', 'The Silverbacks', 'Calamari Ballsrings'),
  (12, '12-4', 'The Pancake Football Team', 'Zweeg'),
  (12, '12-5', 'Pink Sock', 'Sonalika Scorchers'),
  (12, '12-6', 'Maine Course', 'Central Saudi Scammers'),
  
  -- Week 13
  (13, '13-1', 'Team Gone Jawnson', 'NJ Old School'),
  (13, '13-2', 'Jersey Shore Supplements', 'Calamari Ballsrings'),
  (13, '13-3', 'Maui Mooseknuckles', 'Zweeg'),
  (13, '13-4', 'The Silverbacks', 'Sonalika Scorchers'),
  (13, '13-5', 'The Pancake Football Team', 'Central Saudi Scammers'),
  (13, '13-6', 'Pink Sock', 'Maine Course')
ON CONFLICT (matchup_id) DO NOTHING;