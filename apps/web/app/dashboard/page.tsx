const STAT_CARDS = [
  { label: "Wedding Progress", value: "68%", sub: "Complete", ring: true },
  { label: "Budget Used", value: "£18,000", sub: "of £30,000" },
  { label: "Guests Confirmed", value: "320", sub: "of 400 invited" },
  { label: "Tasks Remaining", value: "18", sub: "To Do" },
];

const SIDE_PROGRESS = [
  { label: "Bride Events", value: 75, color: "bg-blush" },
  { label: "Groom Events", value: 60, color: "bg-sage" },
  { label: "Shared Events", value: 82, color: "bg-gold" },
];

const UPCOMING_EVENTS = [
  { name: "Maiyan (Bride)", date: "20 Jun 2027" },
  { name: "Jaggo (Groom)", date: "10 Jul 2027" },
  { name: "Anand Karaj", date: "14 Aug 2027" },
  { name: "Reception", date: "14 Aug 2027" },
];

const BRIDE_EVENTS = [
  { name: "Maiyan", date: "20 Jun 2027", complete: 70 },
  { name: "Mehndi", date: "10 Jul 2027", complete: 67 },
  { name: "Ladies Sangeet", date: "13 Jul 2027", complete: 75 },
  { name: "Choora Ceremony", date: "12 Jul 2027", complete: 50 },
];

const BUDGET_BREAKDOWN = [
  { label: "Venue", value: 8000, color: "bg-blush" },
  { label: "Catering", value: 6000, color: "bg-sage" },
  { label: "Photography", value: 3200, color: "bg-gold" },
  { label: "Decor", value: 6000, color: "bg-charcoal/70" },
  { label: "Entertainment", value: 2000, color: "bg-blush/60" },
  { label: "Outfits", value: 4000, color: "bg-sage/60" },
  { label: "Other", value: 800, color: "bg-gold/60" },
];

const VENDOR_RECS = [
  { name: "Royal Regency", category: "Banqueting Suite", price: "From £4,500", rating: "4.9 (128)" },
  { name: "Dream Decor", category: "Wedding Decor", price: "From £2,000", rating: "4.8 (96)" },
  { name: "AK Musik", category: "DJ Services", price: "From £1,200", rating: "5.0 (52)" },
  { name: "Snap Stories", category: "Photography", price: "From £1,800", rating: "4.9 (137)" },
];

const TASKS = [
  { name: "Book Reception Décor", due: "30 Nov 2027", priority: "High", status: "To Do" },
  { name: "Confirm DJ", due: "28 Nov 2027", priority: "Medium", status: "In Progress" },
  { name: "Send Invitations", due: "10 Nov 2027", priority: "Medium", status: "In Progress" },
  { name: "Finalise Menu", due: "31 Nov 2027", priority: "High", status: "To Do" },
  { name: "RSVP Follow Up", due: "30 Nov 2027", priority: "Low", status: "In Progress" },
];

function StatCard({ label, value, sub, ring }: { label: string; value: string; sub: string; ring?: boolean }) {
  return (
    <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-charcoal/50">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        {ring && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-[10px] font-semibold text-charcoal"
            style={{ background: "conic-gradient(#D4AF37 68%, #F6D7DC 0)" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">68%</span>
          </div>
        )}
        <div>
          <p className="font-heading text-2xl text-charcoal">{value}</p>
          <p className="text-xs text-charcoal/50">{sub}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const totalBudget = BUDGET_BREAKDOWN.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="space-y-6 px-6 py-6">
      {/* Top stat row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Side progress row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SIDE_PROGRESS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-charcoal">{s.label}</p>
              <p className="text-sm text-charcoal/50">{s.value}% Complete</p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-sage/20">
              <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
            </div>
            <button className="mt-3 text-xs font-medium text-gold">View Details →</button>
          </div>
        ))}
      </div>

      {/* Upcoming events strip */}
      <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-lg text-charcoal">Upcoming Events</p>
          <button className="text-xs font-medium text-gold">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {UPCOMING_EVENTS.map((e) => (
            <div key={e.name} className="rounded-xl bg-blush/20 p-3 text-center">
              <div className="mx-auto mb-2 h-14 w-full rounded-lg bg-sage/20" />
              <p className="text-sm font-medium text-charcoal">{e.name}</p>
              <p className="text-xs text-charcoal/50">{e.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Bride events list */}
        <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-lg text-charcoal">Bride Events</p>
            <button className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-charcoal">
              + Add Event
            </button>
          </div>
          <div className="space-y-3">
            {BRIDE_EVENTS.map((e) => (
              <div key={e.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-charcoal">{e.name}</span>
                  <span className="text-charcoal/50">{e.complete}% Complete</span>
                </div>
                <p className="text-xs text-charcoal/40">{e.date}</p>
                <div className="mt-1 h-1.5 rounded-full bg-sage/20">
                  <div className="h-1.5 rounded-full bg-blush" style={{ width: `${e.complete}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget overview donut */}
        <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-lg text-charcoal">Budget Overview</p>
            <button className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-charcoal">
              Manage Budget
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="flex h-32 w-32 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(${BUDGET_BREAKDOWN.map((b, i) => {
                  const start = BUDGET_BREAKDOWN.slice(0, i).reduce((s, x) => s + x.value, 0) / totalBudget * 360;
                  const end = start + (b.value / totalBudget) * 360;
                  const color = ["#F6D7DC", "#C7D3C0", "#D4AF37", "#2F2F2F", "#F6D7DC99", "#C7D3C099", "#D4AF3799"][i];
                  return `${color} ${start}deg ${end}deg`;
                }).join(", ")})`,
              }}
            >
              <span className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="font-heading text-sm text-charcoal">£{(totalBudget / 1000).toFixed(0)}k</span>
                <span className="text-[10px] text-charcoal/50">Total Budget</span>
              </span>
            </div>
            <ul className="mt-4 w-full space-y-1 text-xs">
              {BUDGET_BREAKDOWN.map((b) => (
                <li key={b.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-charcoal/70">
                    <span className={`h-2 w-2 rounded-full ${b.color}`} />
                    {b.label}
                  </span>
                  <span className="text-charcoal/50">£{b.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vendor recommendations */}
        <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-lg text-charcoal">Vendor Recommendations</p>
            <button className="text-xs font-medium text-gold">View All</button>
          </div>
          <div className="space-y-3">
            {VENDOR_RECS.map((v) => (
              <div key={v.name} className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-sage/20" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{v.name}</p>
                  <p className="text-xs text-charcoal/50">{v.category} · {v.price}</p>
                </div>
                <span className="text-xs text-gold">★ {v.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-lg text-charcoal">Tasks / To-Do List</p>
          <button className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-charcoal">+ Add Task</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-charcoal/50">
              <th className="py-2 font-medium">Task</th>
              <th className="py-2 font-medium">Due</th>
              <th className="py-2 font-medium">Priority</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((t) => (
              <tr key={t.name} className="border-t border-sage/20">
                <td className="py-2 text-charcoal">{t.name}</td>
                <td className="py-2 text-charcoal/50">{t.due}</td>
                <td className="py-2 text-charcoal/50">{t.priority}</td>
                <td className="py-2">
                  <span className="rounded-full bg-blush/40 px-2 py-0.5 text-xs text-charcoal">{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
