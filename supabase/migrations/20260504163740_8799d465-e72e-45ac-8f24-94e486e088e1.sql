ALTER TABLE public.registrations
ADD COLUMN IF NOT EXISTS recommender_full_name text,
ADD COLUMN IF NOT EXISTS recommender_phone text;