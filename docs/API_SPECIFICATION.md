# API Specification (NestJS REST)

Base URL: `/api/v1`. Auth via Clerk JWT (Bearer). Role guard: `COUPLE | FAMILY_MEMBER | WEDDING_PLANNER | VENDOR | ADMIN`.

## Auth
- `POST /auth/webhook/clerk` — Clerk user sync webhook
- `GET /auth/me` — current user + role

## Weddings
- `POST /weddings` — create wedding profile
- `GET /weddings/:id`
- `PATCH /weddings/:id`
- `POST /weddings/:id/members` — invite family member / planner
- `GET /weddings/:id/dashboard` — aggregated widget data

## Events
- `GET /weddings/:weddingId/events`
- `POST /weddings/:weddingId/events`
- `GET /events/:id`
- `PATCH /events/:id`
- `DELETE /events/:id`
- `POST /events/:id/template` — generate smart Punjabi event template (checklist + budget items)
- `GET /events/:id/checklist`
- `POST /events/:id/checklist`
- `PATCH /checklist-items/:id`
- `DELETE /checklist-items/:id`
- `GET /events/:id/timeline`
- `POST /events/:id/timeline`
- `PATCH /timeline-blocks/:id` (supports reorder via `sortOrder`)

## Budgets
- `GET /events/:eventId/budget-items`
- `POST /events/:eventId/budget-items`
- `PATCH /budget-items/:id`
- `DELETE /budget-items/:id`
- `GET /weddings/:weddingId/budget-summary` — totals + breakdown by event/category

## Guests
- `GET /weddings/:weddingId/guests`
- `POST /weddings/:weddingId/guests`
- `GET /guests/:id`
- `PATCH /guests/:id`
- `DELETE /guests/:id`
- `POST /guests/import` — CSV bulk import

## RSVPs / Guest Invites
- `GET /events/:eventId/invites`
- `POST /events/:eventId/invites` — assign guest to event
- `PATCH /invites/:id` — update RSVP status, meal pref, plus-ones
- `GET /guests/:id/invites` — per-guest cross-event RSVP grid

## Tasks
- `GET /weddings/:weddingId/tasks`
- `POST /weddings/:weddingId/tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Vendors (Directory — read-mostly, no booking actions)
- `GET /vendors` — search: `?category=&city=&priceMin=&priceMax=&rating=&q=&sort=`
- `GET /vendors/:slug`
- `GET /vendor-categories`
- `POST /vendors` — vendor onboarding (auth role VENDOR)
- `PATCH /vendors/:id`
- `POST /vendors/:id/photos`
- `DELETE /vendor-photos/:id`
- `POST /vendors/:id/analytics-event` — log PROFILE_VIEW / WEBSITE_CLICK / PHONE_CLICK / EMAIL_CLICK (public, rate-limited)
- `GET /vendors/:id/analytics` — vendor-only dashboard data

## Saved Vendors
- `GET /weddings/:weddingId/saved-vendors`
- `POST /weddings/:weddingId/saved-vendors`
- `DELETE /saved-vendors/:id`

## Reviews
- `GET /vendors/:id/reviews`
- `POST /vendors/:id/reviews` (auth COUPLE)
- `DELETE /reviews/:id` (owner or ADMIN)

## Subscriptions (Vendor advertising plans)
- `GET /subscriptions/plans`
- `POST /subscriptions/checkout-session` — Stripe Checkout for FREE→SILVER/GOLD/PLATINUM
- `POST /subscriptions/webhook` — Stripe webhook (activation, renewal, cancellation)
- `GET /subscriptions/me`

## Wedding Website
- `GET /weddings/:weddingId/website`
- `PATCH /weddings/:weddingId/website`
- `GET /public/w/:subdomain` — public rendered site data

## AI Assistant
- `POST /ai/checklist` — `{ eventType }` → suggested checklist
- `POST /ai/budget-recommendation` — `{ totalBudget, eventTypes[] }` → allocation
- `POST /ai/guest-grouping` — `{ guestIds[] }` → suggested per-event invite groups
- `POST /ai/vendor-recommendation` — `{ category, city, budget, style }` → ranked vendor ids

## Admin
- `GET /admin/couples` `GET /admin/vendors` `GET /admin/reviews`
- `PATCH /admin/vendors/:id/verify`
- `GET /admin/subscriptions` `GET /admin/payments`
- `CRUD /admin/gallery` `CRUD /admin/blog` `CRUD /admin/categories` `CRUD /admin/cms-pages`
- `PATCH /admin/vendors/:id/feature`
- `GET /admin/analytics/overview`

## Analytics (internal)
- `GET /analytics/wedding-funnel`
- `GET /analytics/vendor-conversion`

All list endpoints support `?page=&limit=&sort=`. All mutating endpoints validated with `class-validator` DTOs and scoped by `weddingId`/`vendorId` ownership guards.
