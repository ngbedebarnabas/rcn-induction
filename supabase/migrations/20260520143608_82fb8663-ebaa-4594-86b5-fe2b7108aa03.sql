CREATE TABLE public.registration_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  current_step smallint NOT NULL DEFAULT 1,
  step_one_data jsonb,
  step_two_data jsonb,
  spiritual_history jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_registration_drafts_email ON public.registration_drafts (lower(email));

ALTER TABLE public.registration_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a draft"
  ON public.registration_drafts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read drafts (lookup by email)"
  ON public.registration_drafts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update drafts"
  ON public.registration_drafts FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete drafts"
  ON public.registration_drafts FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER registration_drafts_updated_at
  BEFORE UPDATE ON public.registration_drafts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();