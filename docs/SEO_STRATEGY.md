# SEO Strategy

## Programmatic Page Pattern
`/vendors/[category]/[city]` → e.g.:
- `/vendors/photographers/london` → "Punjabi Wedding Photographers London"
- `/vendors/venues/birmingham` → "Punjabi Wedding Venues Birmingham"
- `/vendors/djs/leicester` → "Punjabi Wedding DJs Leicester"
- `/vendors/decorators/manchester` → "Punjabi Wedding Decorators Manchester"
- `/vendors/caterers/london` → "Punjabi Wedding Caterers London"
- `/vendors/makeup-artists/birmingham` → "Punjabi Wedding Makeup Artists Birmingham"

Generated from cartesian product of `VendorCategory` (15 categories) × `City` reference list (top 50+ cities across UK/Canada/USA/India/Australia), giving 750+ unique landing pages at MVP, scaling to thousands as cities/categories grow.

## Page Template
- H1: "Punjabi Wedding {Category} in {City}"
- Intro paragraph (templated, with city/category variables + cultural context)
- Vendor grid (live query, plan-ranked)
- FAQ block (schema.org `FAQPage`)
- Internal links to neighbouring cities + related categories

## Technical SEO
- `generateStaticParams` + ISR (revalidate 1hr) in Next.js App Router for all category×city pages and vendor profile pages.
- JSON-LD: `LocalBusiness` on vendor profiles, `BreadcrumbList` site-wide, `Review`/`AggregateRating` on vendor profiles, `FAQPage` on landing pages.
- `sitemap.xml` index + paginated sitemaps (vendors, categories×cities, blog, gallery).
- Canonical tags, hreflang for country-specific city pages (en-GB, en-CA, en-US, en-IN, en-AU).
- Core Web Vitals: image lazy-loading + priority hints on hero, font subsetting for Playfair Display/Inter, route-level code splitting.

## Content/Off-page
- Blog targeting long-tail queries ("Punjabi wedding budget breakdown UK", "Anand Karaj checklist").
- Vendor-generated content loop: higher-tier vendors get more photos/keywords surfaced, indirectly improving page depth/freshness signals.
