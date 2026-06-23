"use client";

import { useEvents } from "@/lib/hooks/useEvents";
import { useTasks } from "@/lib/hooks/useTasks";
import { useVendorSearch } from "@/lib/hooks/useVendors";
import { useWeddingDashboard } from "@/lib/hooks/useWeddingDashboard";

// TODO: replace with the active wedding id from session/auth context once
// couple onboarding is wired to Clerk + the weddings API.
const DEMO_WEDDING_ID = "demo-wedding-id";

const BUDGET_COLORS = ["bg-blush", "bg-sage", "bg-gold", "bg-charcoal/70", "bg-blush/60", "bg-sage/60", "bg-gold/60"];
const BUDGET_HEX = ["#F6D7DC", "#C7D3C0", "#D4AF37", "#2F2F2F", "#F6D7DC99", "#C7D3C099", "#D4AF3799"];

function StatCard({ label, value, sub, ring }: { label: string; value: string; sub: string; ring?: number }) {
  return (
    <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-charcoal/50">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        {ring !== undefined && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-[10px] font-semibold text-charcoal"
            style={{ background: `conic-gradient(#D4AF37 ${ring}%, #F6D7DC 0)` }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">{ring}%</span>
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
  const { data: dashboard, isLoading, isError } = useWeddingDashboard(DEMO_WEDDING_ID);
  const { data: events } = useEvents(DEMO_WEDDING_ID);
  const { data: tasks } = useTasks(DEMO_WEDDING_ID);
  const { data: vendorRecs } = useVendorSearch({ sort: "featured" });

  const widgets = dashboard?.widgets;
  const upcomingEvents = (events ?? [])
    .filter((e) => e.date)
    .sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime())
    .slice(0, 4);
  const brideEvents = (events ?? []).filter((e) => e.side === "BRIDE").slice(0, 4);

  const budgetTotal = Number(widgets?.totalBudget ?? 0);
  const budgetUsed = Number(widgets?.budgetUsed ?? 0);

  return (
    <main className="space-y-6 px-6 py-6">
      {isLoading && <p className="text-sm text-charcoal/50">Loading dashboard…</p>}
      {isError && (
        <p className="text-sm text-charcoal/50">
          Could not reach the planning API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          your live dashboard here.
        </p>
      )}

      {/* Top stat row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Wedding Progress"
          value={`${widgets?.weddingProgress ?? 0}%`}
          sub="Complete"
          ring={widgets?.weddingProgress ?? 0}
        />
        <StatCard
          label="Budget Used"
          value={`£${budgetUsed.toLocaleString()}`}
          sub={`of £${budgetTotal.toLocaleString()}`}
        />
        <StatCard
          label="Guests Confirmed"
          value={`${widgets?.guestCount ?? 0}`}
          sub="invited"
        />
        <StatCard
          label="Tasks Remaining"
          value={`${widgets?.tasksRemaining ?? 0}`}
          sub="To Do"
        />
      </div>

      {/* Upcoming events strip */}
      <div className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-lg text-charcoal">Upcoming Events</p>
          <button className="text-xs font-medium text-gold">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {upcomingEvents.map((e) => (
            <div key={e.id} className="rounded-xl bg-blush/20 p-3 text-center">
              <div className="mx-auto mb-2 h-14 w-full rounded-lg bg-sage/20" />
              <p className="text-sm font-medium text-charcoal">{e.name}</p>
              <p className="text-xs text-charcoal/50">
                {e.date ? new Date(e.date).toLocaleDateString() : "Date TBC"}
              </p>
            </div>
          ))}
          {upcomingEvents.length === 0 && (
            <p className="col-span-full text-sm text-charcoal/40">No upcoming events yet.</p>
          )}
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
            {brideEvents.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-charcoal">{e.name}</span>
                  <span className="text-charcoal/50">{e.status}</span>
                </div>
                <p className="text-xs text-charcoal/40">
                  {e.date ? new Date(e.date).toLocaleDateString() : "Date TBC"}
                </p>
              </div>
            ))}
            {brideEvents.length === 0 && (
              <p className="text-sm text-charcoal/40">No bride-side events yet.</p>
            )}
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
                background:
                  budgetTotal > 0
                    ? `conic-gradient(${BUDGET_HEX[0]} 0deg ${(budgetUsed / budgetTotal) * 360}deg, ${BUDGET_HEX[1]} 0deg)`
                    : "#C7D3C033",
              }}
            >
              <span className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="font-heading text-sm text-charcoal">£{(budgetTotal / 1000).toFixed(0)}k</span>
                <span className="text-[10px] text-charcoal/50">Total Budget</span>
              </span>
            </div>
            <ul className="mt-4 w-full space-y-1 text-xs">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-charcoal/70">
                  <span className={`h-2 w-2 rounded-full ${BUDGET_COLORS[0]}`} />
                  Spent
                </span>
                <span className="text-charcoal/50">£{budgetUsed.toLocaleString()}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-charcoal/70">
                  <span className={`h-2 w-2 rounded-full ${BUDGET_COLORS[1]}`} />
                  Remaining
                </span>
                <span className="text-charcoal/50">£{Math.max(0, budgetTotal - budgetUsed).toLocaleString()}</span>
              </li>
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
            {vendorRecs?.slice(0, 4).map((v) => (
              <div key={v.id} className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-sage/20" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{v.businessName}</p>
                  <p className="text-xs text-charcoal/50">{v.category.name} · {v.city}</p>
                </div>
                <span className="text-xs text-gold">★ {v.ratingAverage}</span>
              </div>
            ))}
            {(!vendorRecs || vendorRecs.length === 0) && (
              <p className="text-sm text-charcoal/40">No vendor recommendations yet.</p>
            )}
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
            {tasks?.slice(0, 5).map((t) => (
              <tr key={t.id} className="border-t border-sage/20">
                <td className="py-2 text-charcoal">{t.title}</td>
                <td className="py-2 text-charcoal/50">
                  {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}
                </td>
                <td className="py-2 text-charcoal/50">{t.priority}</td>
                <td className="py-2">
                  <span className="rounded-full bg-blush/40 px-2 py-0.5 text-xs text-charcoal">{t.status}</span>
                </td>
              </tr>
            ))}
            {(!tasks || tasks.length === 0) && (
              <tr>
                <td colSpan={4} className="py-3 text-sm text-charcoal/40">
                  No tasks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
