import Link from "next/link";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Vendors", href: "/vendors" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-sage/30 bg-ivory/90 px-6 py-4 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold font-heading text-lg">
          SV
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-heading text-lg tracking-wide text-charcoal">SADA VYAH</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold">Forever Starts Here</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-medium text-charcoal/70 md:flex">
        {LINKS.map((l) => (
          <Link key={l.label} href={l.href} className="hover:text-charcoal">
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-full border border-charcoal/20 px-5 py-2 text-sm font-medium text-charcoal"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-blush px-5 py-2 text-sm font-medium text-charcoal"
        >
          Start Planning
        </Link>
      </div>
    </header>
  );
}
