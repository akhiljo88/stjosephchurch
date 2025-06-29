/*
  # Add family_photo column to users table

  1. Changes
    - Add `family_photo` column to `users` table
    - Column type: text (to store base64 encoded images or URLs)
    - Allow NULL values since not all users may have photos
    - Add default value of NULL

  2. Security
    - No changes to existing RLS policies needed
    - The column inherits the same security policies as the users table
*/

-- Add family_photo column to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'family_photo'
  ) THEN
    ALTER TABLE users ADD COLUMN family_photo text DEFAULT NULL;
  END IF;
END $$;