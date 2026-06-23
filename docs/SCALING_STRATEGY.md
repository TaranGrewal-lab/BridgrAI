# Scaling Strategy

## Data Layer
- PostgreSQL (managed, e.g. AWS RDS/Neon) with read replicas for vendor directory search once read volume grows.
- Heavy filter/search queries (vendor directory) migrate from Prisma `findMany` filtering to a dedicated search index (e.g. Algolia or OpenSearch) once vendor count exceeds ~5k, keeping Postgres as source of truth and the index as a denormalized read model.
- Vendor analytics events (`VendorAnalyticsEvent`) are high-write/low-read; batch-insert via a queue (SQS) and aggregate hourly into rollup tables instead of querying raw events live.

## Application Layer
- Next.js: ISR for vendor profile pages and SEO category×city pages (revalidate every 60s–1hr depending on traffic tier); static generation for blog/CMS/gallery.
- NestJS API horizontally scaled behind a load balancer; stateless (auth via Clerk JWT, no server sessions).
- Caching: Redis for vendor directory search results, plan-based ranking, and AI response caching (same prompt+inputs hash → cached result for 24h).

## Media
- All vendor photos and gallery images on S3 + CloudFront; image optimization via Next/Image or a dedicated image CDN (e.g. Cloudinary) for responsive variants.

## SEO Scale
- Programmatic SEO pages (category × city) generated from `VendorCategory` × a `City` reference table; sitemap.xml generated/paginated, capped at 50k URLs per sitemap file with sitemap index.

## Multi-Region
- As US/Canada/India/Australia traffic grows, deploy Vercel edge functions for web tier; keep a single primary Postgres initially, move to regional read replicas only when latency data justifies it.

## Observability
- Structured logging (Pino) + request tracing, Sentry for error tracking, PostHog/Amplitude for product analytics, Stripe + webhook event audit trail in `AuditLog`.
