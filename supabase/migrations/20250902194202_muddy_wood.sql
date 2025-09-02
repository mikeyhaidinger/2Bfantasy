/*
  # Fix deadlines table structure and permissions

  1. Tables
    - Ensure `deadlines` table exists with correct structure
    - Add proper constraints and indexes
  
  2. Security
    - Enable RLS on `deadlines` table
    - Add policies for public access (matching matchups table)
  
  3. Data
    - Insert default deadline records if they don't exist
*/

-- Ensure the deadlines table exists with correct structure
CREATE TABLE IF NOT EXISTS deadlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('trade', 'keeper')),
  deadline timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_deadline_type UNIQUE (type)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_deadlines_type ON deadlines (type);

-- Enable RLS
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read deadlines" ON deadlines;
DROP POLICY IF EXISTS "Anyone can insert/update deadlines" ON deadlines;

-- Create policies that match the working matchups table
CREATE POLICY "Anyone can read deadlines"
  ON deadlines
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert/update deadlines"
  ON deadlines
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert default records if they don't exist
INSERT INTO deadlines (type, deadline)
VALUES 
  ('trade', NULL),
  ('keeper', NULL)
ON CONFLICT (type) DO NOTHING;