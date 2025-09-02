/*
  # Add unique constraint to deadlines type column

  1. Changes
    - Add unique constraint on `type` column in `deadlines` table
    - This enables upsert operations using `onConflict: 'type'`

  2. Security
    - No changes to existing RLS policies
*/

-- Add unique constraint to the type column
ALTER TABLE deadlines ADD CONSTRAINT unique_deadline_type UNIQUE (type);