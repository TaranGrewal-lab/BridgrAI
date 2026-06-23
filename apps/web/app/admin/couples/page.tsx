"use client";

import { useAdminCouples } from "@/lib/hooks/useAdmin";

export default function AdminCouplesPage() {
  const { data: couples, isLoading, isError } = useAdminCouples();

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Couples</h1>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading couples…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to see live couples here.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Wedding</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Wedding Date</th>
              <th className="px-4 py-3 font-medium">Total Budget</th>
            </tr>
          </thead>
          <tbody>
            {couples?.map((c) => (
              <tr key={c.id} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{c.slug}</td>
                <td className="px-4 py-3 text-charcoal/60">
                  {c.members.find((m) => m.isOwner)?.user.email ?? "—"}
                </td>
                <td className="px-4 py-3 text-charcoal/60">
                  {c.weddingDate ? new Date(c.weddingDate).toLocaleDateString() : "TBC"}
                </td>
                <td className="px-4 py-3 text-charcoal/60">£{Number(c.totalBudget).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
