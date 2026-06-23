const ITEMS = [
  { name: "Royal Regency Venue Hire", event: "Anand Karaj", estimated: 8000, actual: 8000, deposit: 2000, status: "Booked" },
  { name: "Punjab Caterers", event: "Reception", estimated: 6000, actual: 5800, deposit: 1500, status: "Deposit Paid" },
  { name: "Snap Stories Photography", event: "Anand Karaj", estimated: 2000, actual: 1800, deposit: 500, status: "Deposit Paid" },
  { name: "Dream Decor", event: "Mehndi", estimated: 2500, actual: 0, deposit: 0, status: "Planned" },
  { name: "AK Musik DJ", event: "Reception", estimated: 1200, actual: 1200, deposit: 1200, status: "Paid In Full" },
];

export default function BudgetPage() {
  const totalEstimated = ITEMS.reduce((s, i) => s + i.estimated, 0);
  const totalActual = ITEMS.reduce((s, i) => s + i.actual, 0);
  const totalDeposits = ITEMS.reduce((s, i) => s + i.deposit, 0);
  const totalRemaining = totalActual - totalDeposits;

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Wedding Budget</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">+ Add Item</button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Estimated", value: totalEstimated },
          { label: "Total Actual", value: totalActual },
          { label: "Deposits Paid", value: totalDeposits },
          { label: "Remaining Balance", value: totalRemaining },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-charcoal/50">{c.label}</p>
            <p className="mt-1 font-heading text-2xl text-charcoal">£{c.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Estimated</th>
              <th className="px-4 py-3 font-medium">Actual</th>
              <th className="px-4 py-3 font-medium">Deposit</th>
              <th className="px-4 py-3 font-medium">Balance</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((i) => (
              <tr key={i.name} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{i.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{i.event}</td>
                <td className="px-4 py-3 text-charcoal/60">£{i.estimated.toLocaleString()}</td>
                <td className="px-4 py-3 text-charcoal/60">£{i.actual.toLocaleString()}</td>
                <td className="px-4 py-3 text-charcoal/60">£{i.deposit.toLocaleString()}</td>
                <td className="px-4 py-3 text-charcoal/60">£{(i.actual - i.deposit).toLocaleString()}</td>
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
