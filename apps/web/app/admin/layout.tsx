import Link from "next/link";

const NAV = [
  { label: "Overview", href: "/admin" },
  { label: "Couples", href: "/admin/couples" },
  { label: "Vendors", href: "/admin/vendors" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Subscriptions", href: "/admin/subscriptions" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Categories", href: "/admin/categories" },
  { label: "SEO", href: "/admin/seo" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-56 flex-col border-r border-sage/30 bg-charcoal px-4 py-6 md:flex">
        <p className="mb-6 px-2 font-heading text-lg text-ivory">Sada Vyah Admin</p>
        <nav className="flex flex-col gap-1 text-sm">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-xl px-4 py-2 text-ivory/70 hover:bg-ivory/10 hover:text-ivory">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
