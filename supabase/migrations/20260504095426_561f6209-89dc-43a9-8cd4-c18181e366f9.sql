-- 1) Drop public SELECT policy on registrations (PII exposure)
DROP POLICY IF EXISTS "Allow public reads from registrations" ON public.registrations;

-- 2) Consolidate duplicate INSERT policies
DROP POLICY IF EXISTS "Allow public inserts to registrations" ON public.registrations;
-- Keep "Allow anonymous registration" (anon INSERT) as the single submission policy.
-- Ensure authenticated users can also submit.
DROP POLICY IF EXISTS "Allow anonymous registration" ON public.registrations;
CREATE POLICY "Anyone can submit a registration"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 3) Make registrations bucket private and restrict to image/PDF up to 5MB
UPDATE storage.buckets
SET public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png','image/jpeg','image/jpg','image/webp','application/pdf']
WHERE id = 'registrations';

-- 4) Restrict storage object policies for the registrations bucket
DROP POLICY IF EXISTS "Public read access for registrations" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access for registrations" ON storage.objects;
DROP POLICY IF EXISTS "Public file uploads to registrations" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to registrations" ON storage.objects;

-- Only authenticated (admin) users can read registration files
CREATE POLICY "Authenticated users can read registration files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'registrations');

-- Anyone can upload (registration is open) – mime type & size enforced by bucket config
CREATE POLICY "Anyone can upload registration files"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'registrations');