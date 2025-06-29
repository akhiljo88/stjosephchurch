/*
  # Initial Schema Setup for St. Joseph's Church

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `username` (text, unique)
      - `password` (text)
      - `monthly_collection` (numeric, default 100)
      - `cleaning` (numeric, default 50)
      - `common_work` (numeric, default 75)
      - `funeral_fund` (numeric, default 25)
      - `total` (numeric, computed)
      - `is_admin` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (text)
      - `time` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Admin user creation
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  monthly_collection numeric DEFAULT 100,
  cleaning numeric DEFAULT 50,
  common_work numeric DEFAULT 75,
  funeral_fund numeric DEFAULT 25,
  total numeric DEFAULT 250,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert new users"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update user data"
  ON users
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Users can delete user data"
  ON users
  FOR DELETE
  TO public
  USING (true);

-- Create policies for events table
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert events"
  ON events
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update events"
  ON events
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete events"
  ON events
  FOR DELETE
  TO public
  USING (true);

-- Create policies for contact_messages table
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read contact messages"
  ON contact_messages
  FOR SELECT
  TO public
  USING (true);

-- Insert default admin user
INSERT INTO users (name, username, password, monthly_collection, cleaning, common_work, funeral_fund, total, is_admin)
VALUES ('Administrator', 'admin', 'akhil0880', 0, 0, 0, 0, 0, true)
ON CONFLICT (username) DO NOTHING;

-- Create function to automatically update total when amounts change
CREATE OR REPLACE FUNCTION update_user_total()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total = NEW.monthly_collection + NEW.cleaning + NEW.common_work + NEW.funeral_fund;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update total
CREATE TRIGGER update_user_total_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_user_total();

-- Create trigger to set total on insert
CREATE TRIGGER insert_user_total_trigger
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_user_total();