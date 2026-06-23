"use client";

import { useAdminAnalyticsOverview } from "@/lib/hooks/useAdmin";

export default function AdminOverviewPage() {
  const { data, isLoading, isError } = useAdminAnalyticsOverview();

  const METRICS = [
    { label: "Active Weddings", value: data?.weddings ?? 0 },
    { label: "Listed Vendors", value: data?.vendors ?? 0 },
    { label: "Paid Vendor Subscriptions", value: data?.paidVendors ?? 0 },
  ];

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Overview</h1>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading metrics…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to see live metrics here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-charcoal/50">{m.label}</p>
            <p className="mt-1 font-heading text-2xl text-charcoal">{m.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
