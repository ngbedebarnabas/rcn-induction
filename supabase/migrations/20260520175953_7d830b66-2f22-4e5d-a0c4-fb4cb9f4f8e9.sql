
-- Allow public read access to registrations for the admin page
-- (Admin page is gated by a client-side password; submissions are still INSERT-only via public form.)
CREATE POLICY "Public can view registrations"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow public to read objects in the 'registrations' bucket so admin can generate signed URLs / view files
CREATE POLICY "Public can read registrations bucket"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'registrations');
