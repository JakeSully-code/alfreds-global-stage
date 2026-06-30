
CREATE TABLE public.access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  company_role text,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  approve_token text NOT NULL UNIQUE,
  reject_token text NOT NULL UNIQUE,
  token_expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz NOT NULL DEFAULT now(),
  decided_at timestamptz
);
CREATE INDEX access_requests_email_status_idx ON public.access_requests (lower(email), status);

GRANT ALL ON public.access_requests TO service_role;
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated: table is service-role only.

CREATE TABLE public.access_links (
  token text PRIMARY KEY,
  label text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

GRANT ALL ON public.access_links TO service_role;
ALTER TABLE public.access_links ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated: table is service-role only.
