# Sada Vyah — "Forever Starts Here"

Luxury Punjabi wedding planning platform for the UK, Canada, USA, India and Australia.

Sada Vyah is a **planning tool + vendor directory**, not a marketplace: vendors advertise via profile pages and couples contact them externally (phone, email, website, Instagram, Facebook, TikTok). The platform never carries in-app messaging, lead generation, bookings, or wedding-service payments.

## Monorepo Layout
- `apps/web` — Next.js 15 frontend (marketing site, couple dashboard, vendor dashboard, admin panel, public wedding websites)
- `apps/api` — NestJS backend (REST API, Prisma, Stripe subscriptions, AI assistant gateway)
- `packages/db` — Prisma schema (PostgreSQL)
- `docs/` — Product requirements, architecture, API spec, roadmap, and scaling docs

## Documentation
See `docs/PRD.md` for the full product requirements, and the rest of `docs/` for UX architecture, database schema rationale, API specification, subscription logic, AI features, user flows, MVP scope, roadmap, timeline, scaling strategy, SEO strategy, and folder structure.

## Tech Stack
Next.js 15 · TypeScript · Tailwind CSS · Shadcn UI · Framer Motion · React Query · Zustand · NestJS · PostgreSQL · Prisma · Clerk · AWS S3 · Stripe · Resend · Vercel/AWS.

## Getting Started
```bash
npm install
cp apps/api/.env.example apps/api/.env   # configure DATABASE_URL, STRIPE_SECRET_KEY, etc.
npx prisma generate --schema packages/db/prisma/schema.prisma
npm run dev:web   # Next.js on :3000
npm run dev:api   # NestJS on :4000
```
