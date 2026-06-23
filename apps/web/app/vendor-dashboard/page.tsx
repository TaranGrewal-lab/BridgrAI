"use client";

import { useVendorAnalytics } from "@/lib/hooks/useVendors";

// TODO: replace with the authenticated vendor id from session/auth context
// once vendor onboarding is wired to Clerk.
const DEMO_VENDOR_ID = "demo-vendor-id";

export default function VendorOverviewPage() {
  const { data: analytics, isLoading, isError } = useVendorAnalytics(DEMO_VENDOR_ID);

  const countFor = (type: string) => analytics?.find((a) => a.type === type)?._count ?? 0;

  const STATS = [
    { label: "Profile Views", value: countFor("PROFILE_VIEW") },
    { label: "Website Clicks", value: countFor("WEBSITE_CLICK") },
    { label: "Phone Clicks", value: countFor("PHONE_CLICK") },
    { label: "Email Clicks", value: countFor("EMAIL_CLICK") },
  ];

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Vendor Overview</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Sada Vyah is a directory only — couples contact you directly using the details on your
        profile. We never send leads, messages, or booking requests on your behalf.
      </p>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading analytics…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the vendor API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          live analytics here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-charcoal/50">{s.label}</p>
            <p className="mt-1 font-heading text-2xl text-charcoal">{s.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
