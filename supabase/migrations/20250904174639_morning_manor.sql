/*
  # Create power rankings table

  1. New Tables
    - `power_rankings`
      - `id` (uuid, primary key)
      - `team_name` (text, team name)
      - `rank_position` (integer, current ranking position)
      - `writeup` (text, commissioner analysis)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `power_rankings` table
    - Add policy for public read/write access

  3. Initial Data
    - Insert all 12 teams with default rankings and placeholder writeups
*/

CREATE TABLE IF NOT EXISTS power_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text UNIQUE NOT NULL,
  rank_position integer NOT NULL,
  writeup text DEFAULT 'Click edit to add power ranking analysis for this team...',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE power_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read power rankings"
  ON power_rankings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert/update power rankings"
  ON power_rankings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create index for efficient ordering
CREATE INDEX IF NOT EXISTS idx_power_rankings_position ON power_rankings (rank_position);

-- Insert initial team data
INSERT INTO power_rankings (team_name, rank_position, writeup) VALUES
  ('The Silverbacks', 1, 'Click edit to add power ranking analysis for this team...'),
  ('Team Gone Jawnson', 2, 'Click edit to add power ranking analysis for this team...'),
  ('Pink Sock', 3, 'Click edit to add power ranking analysis for this team...'),
  ('The Pancake Football Team', 4, 'Click edit to add power ranking analysis for this team...'),
  ('Zweeg', 5, 'Click edit to add power ranking analysis for this team...'),
  ('Maui Mooseknuckles', 6, 'Click edit to add power ranking analysis for this team...'),
  ('NJ Old School', 7, 'Click edit to add power ranking analysis for this team...'),
  ('Central Saudi Scammers', 8, 'Click edit to add power ranking analysis for this team...'),
  ('Jersey Shore Supplements', 9, 'Click edit to add power ranking analysis for this team...'),
  ('Calamari Ballsrings', 10, 'Click edit to add power ranking analysis for this team...'),
  ('Sonalika Scorchers', 11, 'Click edit to add power ranking analysis for this team...'),
  ('Maine Course', 12, 'Click edit to add power ranking analysis for this team...')
ON CONFLICT (team_name) DO NOTHING;