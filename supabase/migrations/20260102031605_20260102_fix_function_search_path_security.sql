/*
  # Fix Function Search Path Security Issue

  1. Security Fix
    - Function `public.update_user_total` has a mutable search_path which is a security risk
    - Recreate the function with a fixed search_path to prevent privilege escalation
    - This ensures the function always uses the intended schema and cannot be manipulated

  2. Changes
    - Drop existing function and triggers
    - Recreate function with SET search_path = public, pg_temp
    - Recreate triggers
*/

DROP TRIGGER IF EXISTS update_user_total_trigger ON users;
DROP TRIGGER IF EXISTS insert_user_total_trigger ON users;
DROP FUNCTION IF EXISTS public.update_user_total();

CREATE OR REPLACE FUNCTION public.update_user_total()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total = NEW.monthly_collection + NEW.cleaning + NEW.common_work + NEW.funeral_fund;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public, pg_temp;

CREATE TRIGGER update_user_total_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_total();

CREATE TRIGGER insert_user_total_trigger
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_total();