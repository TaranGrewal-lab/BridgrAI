# Deploying Sada Vyah

This covers what's needed to take this repo from "builds locally" to a live
production deployment. Steps marked **(manual)** require creating accounts /
keys in third-party dashboards — nothing here can be automated from the repo.

## 1. Database

- Provision a PostgreSQL instance (Neon, Supabase, RDS, Railway Postgres, etc).
- Set `DATABASE_URL` in the API's environment.
- Run migrations against it: `npx prisma migrate deploy --schema packages/db/prisma/schema.prisma`.
- Optionally seed demo data: `npm run seed --workspace=packages/db` (seeds demo
  categories, an admin user, one demo vendor, and gallery placeholder images —
  safe to skip in production once real admin/vendor data exists).

## 2. Required environment variables

### `apps/api/.env`
| Variable | Where it comes from |
|---|---|
| `DATABASE_URL` | Your Postgres provider |
| `CLERK_SECRET_KEY` | **(manual)** Clerk dashboard → API Keys |
| `STRIPE_SECRET_KEY` | **(manual)** Stripe dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | **(manual)** Stripe dashboard → Developers → Webhooks → signing secret for the endpoint below |
| `RESEND_API_KEY` | **(manual)** Resend dashboard |
| `ANTHROPIC_API_KEY` | **(manual)** Anthropic console, for the AI Wedding Assistant |
| `WEB_URL` | Your deployed web app's URL, e.g. `https://sadavyah.com` |
| `PORT` | Usually set automatically by the host |

### `apps/web/.env`
| Variable | Where it comes from |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | **(manual)** Clerk dashboard → API Keys |
| `CLERK_SECRET_KEY` | Same Clerk secret key as the API |
| `NEXT_PUBLIC_API_URL` | Your deployed API's URL + `/api/v1`, e.g. `https://api.sadavyah.com/api/v1` |

## 3. Stripe webhook **(manual)**

Vendor subscription upgrades only take effect when Stripe confirms payment via
webhook — the `/api/v1/subscriptions/webhook` endpoint verifies the signature
on every event (see `apps/api/src/subscriptions/subscriptions.controller.ts`),
so it will silently reject anything not actually sent by Stripe.

1. In the Stripe dashboard, add a webhook endpoint pointing at
   `https://<your-api-domain>/api/v1/subscriptions/webhook`.
2. Subscribe it to the `checkout.session.completed` event.
3. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Before going live, run a full Stripe **test-mode** checkout end to end —
   create a checkout session, complete it with a Stripe test card, and confirm
   the vendor's `Subscription` row updates to `ACTIVE`. This has not yet been
   exercised against a real Stripe account in this repo.

## 4. Hosting

- **`apps/web`** (Next.js): deploy to Vercel — it auto-detects the Next.js app;
  point the Vercel project's root directory at `apps/web` and set the env vars
  from the table above in the Vercel dashboard.
- **`apps/api`** (NestJS): build with the provided `apps/api/Dockerfile` (run
  `docker build -f apps/api/Dockerfile .` from the repo root) and deploy the
  image to Railway, Render, Fly.io, or similar. The container runs
  `prisma migrate deploy` on boot before starting the server.

## 5. Domains & wedding subdomains

- Point your main domain (e.g. `sadavyah.com`) at the web deployment.
- Wedding websites are served at `/w/[subdomain]` (path-based, not actual DNS
  subdomains) — e.g. `sadavyah.com/w/jas-and-amrit`. No extra DNS config is
  needed for this; it's routed entirely by the Next.js app. Per the MVP scope,
  real DNS-level custom domains for wedding sites are Phase 2.

## 6. Before accepting real traffic

- [ ] Stripe test-mode checkout run end-to-end (see step 3.4)
- [ ] Clerk production instance (not a dev instance) configured, with the
      production publishable/secret keys swapped in
- [ ] Privacy Policy / Terms pages reviewed by a human, not just drafted
      (`apps/web/app/privacy`, `apps/web/app/terms`)
- [ ] Real gallery images uploaded via the admin CMS to replace the seeded
      placeholder images
- [ ] `npm test --workspace=apps/api` passing in CI
