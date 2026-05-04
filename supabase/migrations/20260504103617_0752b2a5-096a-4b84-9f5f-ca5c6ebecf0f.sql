drop policy if exists "Anyone can upload registration files" on storage.objects;
drop policy if exists "Authenticated can view registration files" on storage.objects;
drop policy if exists "Authenticated users can read registration files" on storage.objects;

create policy "Anyone can upload registration files"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'registrations'
  and (
    name like 'passports/%'
    or name like 'documents/%'
  )
);

create policy "Authenticated can view registration files"
on storage.objects
for select
to authenticated
using (bucket_id = 'registrations');