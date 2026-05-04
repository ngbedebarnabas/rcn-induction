DROP POLICY IF EXISTS "Anyone can upload registration files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can view registration files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to registrations" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access for registrations" ON storage.objects;

CREATE POLICY "Anyone can upload registration files"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'registrations');

CREATE POLICY "Authenticated can view registration files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'registrations');