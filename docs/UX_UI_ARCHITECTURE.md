# UX / UI Architecture

## Sitemap

```
/                                Homepage
/how-it-works
/pricing
/inspiration                     Gallery index
/inspiration/[category]          Roka, Engagement, Maiyan, Mehndi, Jaggo, Choora, Anand-Karaj, Reception
/vendors                         Vendor directory search
/vendors/[category]/[city]       SEO landing page (e.g. /vendors/photographers/london)
/vendors/profile/[slug]          Vendor profile page
/vendor-signup                   Vendor onboarding / plan selection
/blog, /blog/[slug]
/about /contact /privacy /terms
/login /signup

/dashboard                       Couple dashboard (auth)
/dashboard/wedding                Wedding profile / settings
/dashboard/events                 Event list
/dashboard/events/[id]            Event detail (checklist, budget, guests, vendors, timeline)
/dashboard/budget                 Wedding-wide budget breakdown
/dashboard/guests                 Guest database
/dashboard/guests/[id]            Guest detail + per-event RSVP grid
/dashboard/tasks                  Task board
/dashboard/timeline                Drag-drop master timeline
/dashboard/vendors/saved           Saved vendors per event
/dashboard/website                 Wedding website builder
/dashboard/ai                      AI Wedding Assistant

/vendor-dashboard                 Vendor dashboard (auth, role=VENDOR)
/vendor-dashboard/profile
/vendor-dashboard/photos
/vendor-dashboard/analytics
/vendor-dashboard/subscription

/admin                            Admin panel (auth, role=ADMIN)
/admin/couples /admin/vendors /admin/reviews /admin/subscriptions
/admin/payments /admin/gallery /admin/blog /admin/categories
/admin/featured /admin/seo /admin/analytics /admin/verification /admin/cms
```

## Design Tokens
```ts
colors: {
  blush: '#F6D7DC',
  gold: '#D4AF37',
  ivory: '#FFFDF8',
  sage: '#C7D3C0',
  charcoal: '#2F2F2F',
}
fontFamily: {
  heading: ['Playfair Display', 'serif'],
  body: ['Inter', 'sans-serif'],
}
```

## Component Library (Shadcn-based)
`Button`, `Card`, `Dialog`, `Tabs`, `Badge`, `Progress`, `Avatar`, `DataTable`, `DatePicker`, `Drawer`, `Tooltip`, `Stepper`, plus custom: `BudgetRing`, `CountdownTimer`, `EventTimelineDrag`, `VendorCard`, `GalleryMasonry`, `RSVPGrid`, `PlanBadge`.

## Dashboard Widget Grid (Couple)
Wedding Progress · Budget Used · Guest Count · Guests Confirmed · Upcoming Events · Tasks Remaining · Saved Vendors · Countdown · Recent Activity — rendered as a responsive 4-column → 1-column masonry of `Card` widgets.

## Vendor Dashboard Widget Grid
Profile Views · Clicks to Website · Phone Clicks · Email Clicks · Search Ranking · Subscription Status · Photo Manager · Profile Completion. Explicitly **no** Messages, Leads, or Bookings widgets.
