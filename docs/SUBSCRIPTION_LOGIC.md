# Subscription Logic

## Vendor Advertising Plans (Stripe-billed, monthly)

| Plan | Price | Photos | Placement | Badge | Analytics |
|---|---|---|---|---|---|
| Free | £0 | 1 | Standard | — | — |
| Silver | £19/mo | 20 | Improved ranking | Verified | Basic |
| Gold | £49/mo | Unlimited | Top of category + homepage feature | Gold | Full dashboard |
| Platinum | £99/mo | Unlimited | Homepage spotlight banner, sponsored slot | Premium | Advanced + priority ranking |

## Rules
- Plan is stored on `Subscription.plan`, mirrored to `Vendor.isFeatured` for Gold/Platinum.
- Search ranking score = `f(plan_weight, ratingAverage, ratingCount, verification, recency)`; plan_weight: Platinum=4, Gold=3, Silver=2, Free=1.
- Downgrade/cancellation (Stripe webhook `customer.subscription.deleted` or `updated` to lower tier) immediately truncates photo gallery display to the new tier's limit (photos remain stored, just hidden) and removes featured placement.
- Stripe is the source of truth for billing state; our `Subscription.status` mirrors Stripe subscription status (`active`, `past_due`, `canceled`, `trialing`).
- No couple-side payment ever touches a vendor — Stripe Connect / marketplace payouts are explicitly **out of scope**.

## Couple Plans
| Plan | Price | Includes |
|---|---|---|
| Free | £0 | 1 wedding, core planning tools, 3 saved vendors per event |
| Premium | £9/mo or £49/yr | Unlimited saved vendors, AI Assistant, custom wedding website + domain, guest CSV import/export, priority support |

## Webhook Flow
1. Vendor selects plan → `POST /subscriptions/checkout-session` → Stripe Checkout.
2. Stripe redirects back; `checkout.session.completed` webhook creates/updates `Subscription` + `Payment` row.
3. Renewal: `invoice.paid` webhook updates `currentPeriodEnd`.
4. Failure: `invoice.payment_failed` → status `PAST_DUE`, grace-period email via Resend, downgrade to Free after 7 days unresolved.
