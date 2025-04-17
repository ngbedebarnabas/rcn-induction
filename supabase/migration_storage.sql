
-- Create a storage bucket for registration files
CREATE BUCKET IF NOT EXISTS registrations;

-- Set public policy to allow reading files (since these are registration documents)
CREATE POLICY "Allow public read access for registrations"
ON storage.objects FOR SELECT
USING (bucket_id = 'registrations');

-- Set policy to allow uploading files (since registrants need to upload their documents)
CREATE POLICY "Allow public uploads to registrations"
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'registrations');
