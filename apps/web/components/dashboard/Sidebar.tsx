import Link from "next/link";

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Events", href: "/dashboard/events" },
  { label: "Budget", href: "/dashboard/budget" },
  { label: "Guest List", href: "/dashboard/guests" },
  { label: "Vendors", href: "/dashboard/vendors" },
  { label: "Tasks", href: "/dashboard/tasks" },
  { label: "Timeline", href: "/dashboard/timeline" },
  { label: "Website", href: "/dashboard/website" },
  { label: "AI Assistant", href: "/dashboard/ai" },
  { label: "Inspiration", href: "/dashboard/inspiration" },
  { label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar({ active }: { active?: string }) {
  return (
    <aside className="hidden w-56 flex-col border-r border-sage/30 bg-white px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold font-heading text-sm">
          SV
        </span>
        <div className="leading-tight">
          <p className="font-heading text-sm text-charcoal">SADA VYAH</p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-gold">Forever Starts Here</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 text-sm">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`rounded-xl px-4 py-2 font-medium transition ${
              active === item.label
                ? "bg-blush text-charcoal"
                : "text-charcoal/60 hover:bg-sage/10 hover:text-charcoal"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
