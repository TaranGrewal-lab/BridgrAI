import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";

const HERO_ICONS = [
  { icon: "💰", label: "Budget Tracking" },
  { icon: "👥", label: "Guest Management" },
  { icon: "📋", label: "Event Planning" },
  { icon: "🏛️", label: "Vendor Recommendations" },
  { icon: "📅", label: "Timeline & Checklists" },
];

const TRUST_BADGES = [
  { title: "100% Free To Use", subtitle: "No hidden charges" },
  { title: "Trusted by 10,000+ Couples", subtitle: "Plan with confidence" },
  { title: "Save Time & Stress", subtitle: "Everything in one place" },
  { title: "Made For Punjabi Weddings", subtitle: "Built with love & understanding" },
];

const FEATURES = [
  "Budget Tracking",
  "Guest Management",
  "Wedding Timeline",
  "Vendor Directory",
  "Task Management",
  "Wedding Website Builder",
  "RSVP Tracking",
  "Inspiration Gallery",
  "Bride Side Planning",
  "Groom Side Planning",
];

const HOW_IT_WORKS = [
  "Create Wedding",
  "Set Budget",
  "Add Events",
  "Manage Guests",
  "Discover Vendors",
  "Track Progress",
  "Celebrate",
];

const GALLERY_CATEGORIES = [
  "Roka",
  "Engagement",
  "Maiyan",
  "Mehndi",
  "Jaggo",
  "Choora Ceremony",
  "Anand Karaj",
  "Reception",
];

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-10 bg-gradient-to-b from-blush/40 via-ivory to-ivory px-6 py-16 md:grid-cols-2 md:px-16">
        <div>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            Plan Your Dream
            <br />
            Punjabi
            <br />
            <span className="text-gold italic">Wedding</span>
          </h1>
          <p className="mt-6 max-w-md text-charcoal/70">
            Everything you need to plan, organise and celebrate your perfect wedding — all in one
            place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-blush px-8 py-3 font-medium text-charcoal shadow-sm transition hover:opacity-90"
            >
              Start Planning Free
            </Link>
            <Link
              href="/how-it-works"
              className="flex items-center gap-2 px-4 py-3 font-medium text-charcoal/70 hover:text-charcoal"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/30">
                ▶
              </span>
              Watch Demo
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-5">
            {HERO_ICONS.map((f) => (
              <div key={f.label} className="text-center text-xs text-charcoal/60">
                <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                  {f.icon}
                </div>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blush/60 to-sage/30" />
      </section>

      {/* Trust badges */}
      <section className="grid grid-cols-2 gap-6 border-y border-sage/30 bg-white px-6 py-8 text-center sm:grid-cols-4">
        {TRUST_BADGES.map((b) => (
          <div key={b.title}>
            <p className="font-heading text-sm text-charcoal">{b.title}</p>
            <p className="text-xs text-charcoal/50">{b.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <h2 className="text-center font-heading text-3xl text-charcoal">
          Everything for Your Big Day
        </h2>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-5">
          {FEATURES.map((f) => (
            <div
              key={f}
              className="rounded-2xl border border-sage/40 bg-white/60 p-5 text-center font-medium text-charcoal shadow-sm"
            >
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-sage/20 px-6 py-20">
        <h2 className="text-center font-heading text-3xl text-charcoal">How It Works</h2>
        <ol className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step} className="flex w-36 flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-heading text-ivory">
                {i + 1}
              </span>
              <span className="mt-3 text-sm font-medium text-charcoal">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Vendor Showcase */}
      <section className="px-6 py-20">
        <h2 className="text-center font-heading text-3xl text-charcoal">Discover Vendors</h2>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-4">
          {["Featured Vendors", "Popular Categories", "Top Rated Vendors", "Recently Added"].map(
            (t) => (
              <Link
                key={t}
                href="/vendors"
                className="rounded-full bg-blush px-6 py-2 text-sm font-medium text-charcoal"
              >
                {t}
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="bg-blush/30 px-6 py-20">
        <h2 className="text-center font-heading text-3xl text-charcoal">Inspiration Gallery</h2>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/inspiration/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-xl bg-white/70 p-6 text-center font-heading text-charcoal shadow-sm transition hover:shadow-md"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <h2 className="text-center font-heading text-3xl text-charcoal">Pricing</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-charcoal/70">
          Free planning tools for every couple. Vendors advertise on Free, Silver, Gold or
          Platinum plans.
        </p>
        <div className="mx-auto mt-10 flex justify-center gap-4">
          <Link href="/pricing" className="rounded-full bg-charcoal px-8 py-3 font-medium text-ivory">
            View Couple Plans
          </Link>
          <Link
            href="/vendor-signup"
            className="rounded-full border border-charcoal/20 px-8 py-3 font-medium text-charcoal"
          >
            View Vendor Plans
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-charcoal/10 px-6 py-12 text-center text-sm text-charcoal/60">
        <p className="font-heading text-lg text-charcoal">Sada Vyah</p>
        <nav className="mt-4 flex flex-wrap justify-center gap-6">
          {[
            { label: "About", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Vendor Sign Up", href: "/vendor-onboarding" },
          ].map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-charcoal">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6">© {new Date().getFullYear()} Sada Vyah. Forever Starts Here.</p>
      </footer>
    </main>
  );
}
