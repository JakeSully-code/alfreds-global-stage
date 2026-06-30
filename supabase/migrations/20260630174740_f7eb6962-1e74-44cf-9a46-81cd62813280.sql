
CREATE TABLE public.allowed_recruiter_emails (
  email text PRIMARY KEY,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.allowed_recruiter_emails TO authenticated;
GRANT ALL ON public.allowed_recruiter_emails TO service_role;

ALTER TABLE public.allowed_recruiter_emails ENABLE ROW LEVEL SECURITY;

-- A signed-in user can only see their own email row (used to verify their own allowlist membership).
CREATE POLICY "Users can check their own allowlist row"
ON public.allowed_recruiter_emails
FOR SELECT
TO authenticated
USING (lower(email) = lower(coalesce((auth.jwt() ->> 'email'), '')));
