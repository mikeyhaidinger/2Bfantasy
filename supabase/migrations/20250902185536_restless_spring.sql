/*
  # Add week completion status to matchups

  1. Changes
    - Add `is_complete` boolean column to `matchups` table with default false
    - Add index on `is_complete` for efficient querying
    - Update existing records to have `is_complete = false`

  2. Security
    - Maintains existing RLS policies
    - No changes to permissions needed
*/

-- Add is_complete column to matchups table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'matchups' AND column_name = 'is_complete'
  ) THEN
    ALTER TABLE matchups ADD COLUMN is_complete boolean DEFAULT false NOT NULL;
  END IF;
END $$;

-- Add index for efficient querying by completion status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'matchups' AND indexname = 'idx_matchups_is_complete'
  ) THEN
    CREATE INDEX idx_matchups_is_complete ON matchups(is_complete);
  END IF;
END $$;

-- Update existing records to be incomplete by default
UPDATE matchups SET is_complete = false WHERE is_complete IS NULL;