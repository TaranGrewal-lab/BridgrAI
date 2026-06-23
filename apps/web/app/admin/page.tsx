const METRICS = [
  { label: "Active Weddings", value: "1,284" },
  { label: "Listed Vendors", value: "642" },
  { label: "Paid Vendor Subscriptions", value: "211" },
  { label: "Pending Verifications", value: "14" },
];

export default function AdminOverviewPage() {
  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Overview</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
