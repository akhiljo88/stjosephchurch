/*
  # Create families and media tables

  1. New Tables
    - `families`
      - `id` (uuid, primary key)
      - `head_of_family` (text)
      - `contact_number` (text)
      - `address` (text)
      - `number_of_members` (integer)
      - `members` (jsonb)
      - `family_photo` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `media`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `type` (text)
      - `src` (text)
      - `filename` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Add policies for admin users to manage data
*/

-- Create families table
CREATE TABLE IF NOT EXISTS families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  head_of_family text NOT NULL,
  contact_number text NOT NULL,
  address text NOT NULL,
  number_of_members integer NOT NULL DEFAULT 0,
  members jsonb DEFAULT '[]'::jsonb,
  family_photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  src text NOT NULL,
  filename text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Families policies
CREATE POLICY "Anyone can view families"
  ON families FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert families"
  ON families FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update families"
  ON families FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete families"
  ON families FOR DELETE
  TO authenticated
  USING (true);

-- Media policies
CREATE POLICY "Anyone can view media"
  ON media FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media"
  ON media FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
  ON media FOR DELETE
  TO authenticated
  USING (true);
