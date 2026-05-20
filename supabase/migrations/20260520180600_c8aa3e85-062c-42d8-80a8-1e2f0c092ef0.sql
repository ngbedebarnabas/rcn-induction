-- Roles enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Lock down registrations: drop permissive public SELECT, replace with admin-only
DROP POLICY IF EXISTS "Allow authenticated users to view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Public can view registrations" ON public.registrations;

CREATE POLICY "Admins can view all registrations"
ON public.registrations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Storage: only admins can read registrations bucket files
DROP POLICY IF EXISTS "Anyone can view registration files" ON storage.objects;
DROP POLICY IF EXISTS "Public can view registration files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can view registration files" ON storage.objects;

CREATE POLICY "Admins can read registration files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'registrations' AND public.has_role(auth.uid(), 'admin'));