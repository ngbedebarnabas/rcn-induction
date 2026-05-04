ALTER TABLE public.registrations
  ALTER COLUMN accepted_christ_date TYPE text USING accepted_christ_date::text,
  ALTER COLUMN date_of_new_birth TYPE text USING date_of_new_birth::text,
  ALTER COLUMN date_of_water_baptism TYPE text USING date_of_water_baptism::text,
  ALTER COLUMN date_of_holy_ghost_baptism TYPE text USING date_of_holy_ghost_baptism::text;