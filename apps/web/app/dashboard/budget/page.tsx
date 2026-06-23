"use client";

import { useBudgetItems, useBudgetSummary } from "@/lib/hooks/useBudget";
import { useCurrentWedding } from "@/lib/hooks/useWedding";
import { useEvents } from "@/lib/hooks/useEvents";

export default function BudgetPage() {
  const { data: wedding } = useCurrentWedding();
  const weddingId = wedding?.id ?? "";
  const { data: events } = useEvents(weddingId);
  const primaryEventId = events?.[0]?.id ?? "";
  const { data: items, isLoading, isError } = useBudgetItems(primaryEventId);
  const { data: summary } = useBudgetSummary(weddingId);

  const SUMMARY_CARDS = [
    { label: "Total Estimated", value: summary?.totalEstimated ?? "0" },
    { label: "Total Actual", value: summary?.totalActual ?? "0" },
    { label: "Deposits Paid", value: summary?.totalDeposits ?? "0" },
    { label: "Remaining Balance", value: summary?.totalRemaining ?? "0" },
  ];

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Wedding Budget</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">+ Add Item</button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SUMMARY_CARDS.map((c) => (
          <div key={c.label} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-charcoal/50">{c.label}</p>
            <p className="mt-1 font-heading text-2xl text-charcoal">
              £{Number(c.value).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading budget items…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the planning API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          live budget items here.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Estimated</th>
              <th className="px-4 py-3 font-medium">Actual</th>
              <th className="px-4 py-3 font-medium">Deposit</th>
              <th className="px-4 py-3 font-medium">Balance</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((i) => (
              <tr key={i.id} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{i.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{i.category ?? "—"}</td>
                <td className="px-4 py-3 text-charcoal/60">£{Number(i.estimatedCost).toLocaleString()}</td>
                <td className="px-4 py-3 text-charcoal/60">£{Number(i.actualCost).toLocaleString()}</td>
                <td className="px-4 py-3 text-charcoal/60">£{Number(i.depositPaid).toLocaleString()}</td>
                <td className="px-4 py-3 text-charcoal/60">
                  £{(Number(i.actualCost) - Number(i.depositPaid)).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-sage/20 px-2 py-0.5 text-xs text-charcoal">{i.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
