"use client";

import { useAdminPayments } from "@/lib/hooks/useAdmin";

export default function AdminPaymentsPage() {
  const { data: payments, isLoading, isError } = useAdminPayments();

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Payments</h1>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading payments…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to see live payments here.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Vendor</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((p) => (
              <tr key={p.id} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{p.subscription.vendor.businessName}</td>
                <td className="px-4 py-3 text-charcoal/60">£{Number(p.amount).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-sage/20 px-2 py-0.5 text-xs text-charcoal">{p.status}</span>
                </td>
                <td className="px-4 py-3 text-charcoal/60">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
