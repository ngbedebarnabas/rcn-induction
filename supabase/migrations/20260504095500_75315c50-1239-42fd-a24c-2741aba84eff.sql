-- Revoke SELECT from anon/authenticated to remove from GraphQL discovery.
-- Authenticated admin reads will be re-granted explicitly.
REVOKE SELECT ON public.registrations FROM anon;
REVOKE SELECT ON public.registrations FROM authenticated;
GRANT SELECT ON public.registrations TO authenticated;