# Sada Vyah — Product Requirements Document

**Tagline:** "Forever Starts Here"

## 1. Vision
Sada Vyah ("Our Wedding" in Punjabi) is a luxury Punjabi wedding planning platform serving couples in the UK, Canada, USA, India, and Australia. It combines wedding planning tools (budget, guests, events, tasks, timeline), a vendor *directory* (not a marketplace), an inspiration gallery, and a wedding website builder.

## 2. Non-Goals (Explicit Constraints)
- **No booking marketplace.** Vendors are never bookable through the platform.
- **No in-app messaging.** Couples never message vendors via Sada Vyah.
- **No lead generation for vendors.** Vendor profiles are advertising only.
- **No payment processing between couples and vendors.** Stripe is used only for *platform subscriptions* (vendor advertising plans, couple premium plans), never for wedding services.
- Couples contact vendors externally via phone, email, website, Instagram, Facebook, or TikTok links shown on the vendor profile.

## 3. Target Users
**Couples side:** Bride, Groom, Parents, Family Members, Wedding Planners (acting on behalf of a couple).
**Vendor side:** Venues, Photographers, Videographers, Decorators, Florists, Caterers, DJs, Bands, Dhol Players, Makeup Artists, Mehndi Artists, Wedding Planners, Bridal Wear Suppliers, Jewellers, Cake Designers, Transport Providers, Invitation Designers.
**Internal:** Platform Admins / Moderators.

## 4. Core Product Pillars
1. **Wedding Planning Suite** — Events, Budgets, Guests, RSVPs, Tasks, Timeline.
2. **Vendor Directory** — Searchable, filterable, subscription-tiered advertising listings.
3. **Inspiration Gallery** — Curated imagery across Punjabi wedding ceremony categories.
4. **Wedding Website Builder** — Public-facing micro-site per couple.
5. **AI Wedding Assistant** — Checklist, timeline, budget, vendor, and guest suggestions.
6. **Admin & Trust Layer** — Vendor verification, review moderation, fraud detection, CMS.

## 5. Design System
- **Palette:** Blush Pink `#F6D7DC`, Champagne Gold `#D4AF37`, Ivory White `#FFFDF8`, Sage Green `#C7D3C0`, Charcoal `#2F2F2F`.
- **Typography:** Headings — Playfair Display; Body — Inter.
- **Style:** Elegant, luxury, mobile-first, minimal dashboard chrome, soft floral motifs, generous whitespace, accessible (WCAG 2.1 AA), fast (Core Web Vitals green).

## 6. Information Architecture
See `docs/UX_UI_ARCHITECTURE.md`.

## 7. Subscription Model
See `docs/SUBSCRIPTION_LOGIC.md`.

## 8. Success Metrics (North Star + Guardrails)
- North Star: Weddings actively planned per month (wedding profile with ≥1 event + ≥1 guest added in last 30 days).
- Vendor side: Paid vendor conversion rate (Free → Silver/Gold/Platinum), profile view → external-contact-click rate.
- Guardrail: Zero in-platform messaging/booking surface area (compliance check in code review & QA).

## 9. MVP vs Phase 2
See `docs/MVP_SCOPE.md` and `docs/ROADMAP.md`.
