const WIDGETS = [
  { label: "Wedding Progress", value: "62%" },
  { label: "Budget Used", value: "£18,400 / £30,000" },
  { label: "Guest Count", value: "184" },
  { label: "Guests Confirmed", value: "121" },
  { label: "Upcoming Events", value: "3" },
  { label: "Tasks Remaining", value: "27" },
  { label: "Saved Vendors", value: "12" },
  { label: "Countdown To Wedding", value: "94 days" },
  { label: "Recent Activity", value: "5 updates today" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-10">
      <h1 className="font-heading text-3xl text-charcoal">Your Wedding Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WIDGETS.map((w) => (
          <div key={w.label} className="rounded-2xl border border-sage/40 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-charcoal/60">{w.label}</p>
            <p className="mt-2 font-heading text-2xl text-charcoal">{w.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
