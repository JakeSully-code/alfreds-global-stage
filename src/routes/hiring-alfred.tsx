// Public alias — the real protected route lives at /_authenticated/hiring-alfred,
// which the pathless layout serves at the same URL (/hiring-alfred). This file
// only exists to satisfy direct deep links during the rare case the layout file
// is not yet hot-reloaded; it immediately redirects into the protected layout.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/hiring-alfred")({
  beforeLoad: () => {
    throw redirect({ to: "/auth", search: { redirect: "/hiring-alfred" } });
  },
  component: () => null,
});
