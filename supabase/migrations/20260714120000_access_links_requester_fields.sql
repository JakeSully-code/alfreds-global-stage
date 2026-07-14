
ALTER TABLE public.access_links
  ADD COLUMN name text,
  ADD COLUMN email text,
  ADD COLUMN company_role text;

CREATE INDEX access_links_email_idx ON public.access_links (lower(email));
