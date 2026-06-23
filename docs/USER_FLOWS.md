# Key User Flows

## Couple Onboarding
Sign up → Create wedding profile (names, date, country/city, currency) → Choose starter events (suggested: Roka, Mehndi, Anand Karaj, Reception, +custom) → Set total budget → Land on Dashboard.

## Event Planning Flow
Dashboard → Events → Select event → "Generate Template" → System inserts recommended checklist + budget items for that ceremony type → User edits/removes/adds items, sets estimated costs → Budget Summary auto-recalculates.

## Guest + RSVP Flow
Guests → Add guest (or CSV import) → Open guest → Toggle invited-to per event → Guest receives no platform message (out of scope) — couple manually tracks RSVP status updated from real-world responses → RSVP grid reflects per-event status.

## Vendor Discovery Flow (no booking)
Vendors directory → Filter by category/city/price/rating → Open vendor profile → Click external contact (phone/email/website/Instagram) — opens native dialer/mail client/new tab → Optionally "Save to Event" for personal budget tracking only.

## Vendor Onboarding Flow
Vendor sign up → Choose plan (Free/Silver/Gold/Platinum) → Stripe Checkout (skipped for Free) → Complete profile (business info, photos up to plan limit, services, social links) → Submitted for verification → Admin approves → Listing goes live, ranked per plan weight.

## Wedding Website Flow
Dashboard → Website → Pick theme → Fill story/gallery/countdown/venue/RSVP form/registry links → Publish → Public URL `sadavyah.com/w/{subdomain}` live; guests RSVP via public form, which writes to `GuestInvite`.
