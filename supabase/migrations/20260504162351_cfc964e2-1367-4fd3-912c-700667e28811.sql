ALTER TABLE public.registrations 
  ADD COLUMN first_name text,
  ADD COLUMN middle_name text,
  ADD COLUMN last_name text;

UPDATE public.registrations
SET 
  first_name = COALESCE(NULLIF(split_part(full_name, ' ', 1), ''), full_name),
  last_name = CASE 
    WHEN array_length(string_to_array(full_name, ' '), 1) > 1 
    THEN split_part(full_name, ' ', array_length(string_to_array(full_name, ' '), 1))
    ELSE full_name
  END,
  middle_name = CASE 
    WHEN array_length(string_to_array(full_name, ' '), 1) > 2 
    THEN array_to_string((string_to_array(full_name, ' '))[2:array_length(string_to_array(full_name, ' '), 1)-1], ' ')
    ELSE NULL
  END
WHERE full_name IS NOT NULL;

ALTER TABLE public.registrations 
  ALTER COLUMN first_name SET NOT NULL,
  ALTER COLUMN last_name SET NOT NULL;

ALTER TABLE public.registrations ALTER COLUMN full_name DROP NOT NULL;