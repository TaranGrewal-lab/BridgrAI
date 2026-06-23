"use client";

import { useCurrentVendor, useVendorAnalytics } from "@/lib/hooks/useVendors";

export default function VendorAnalyticsPage() {
  const { data: vendor } = useCurrentVendor();
  const { data: analytics, isLoading, isError } = useVendorAnalytics(vendor?.id ?? "");

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Analytics</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Engagement is directory-only — profile views and click-throughs to your contact details.
        We do not track or pass along leads or bookings.
      </p>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading analytics…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the vendor API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          live analytics here.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Event Type</th>
              <th className="px-4 py-3 font-medium">Count</th>
            </tr>
          </thead>
          <tbody>
            {analytics?.map((a) => (
              <tr key={a.type} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{a.type}</td>
                <td className="px-4 py-3 text-charcoal/60">{a._count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
