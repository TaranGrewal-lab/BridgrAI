import type { Metadata } from "next";

interface CategoryCityPageProps {
  params: Promise<{ category: string; city: string }>;
}

function humanize(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: CategoryCityPageProps): Promise<Metadata> {
  const { category: categorySlug, city: citySlug } = await params;
  const category = humanize(categorySlug);
  const city = humanize(citySlug);
  return {
    title: `Punjabi Wedding ${category} in ${city} | Sada Vyah`,
    description: `Browse top-rated Punjabi wedding ${category.toLowerCase()} in ${city}. Compare prices, photos and reviews — contact vendors directly, no booking fees.`,
  };
}

const SAMPLE_VENDORS = [
  { name: "Royal Regency", rating: "4.9 (128)", price: "From £4,500" },
  { name: "Heritage Banqueting Hall", rating: "4.7 (84)", price: "From £3,200" },
  { name: "The Grand Marquee", rating: "4.8 (61)", price: "From £5,000" },
];

export default async function CategoryCityPage({ params }: CategoryCityPageProps) {
  const { category: categorySlug, city: citySlug } = await params;
  const category = humanize(categorySlug);
  const city = humanize(citySlug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-xs text-charcoal/50">
        Vendors / {category} / {city}
      </nav>
      <h1 className="mt-2 font-heading text-3xl text-charcoal">
        Punjabi Wedding {category} in {city}
      </h1>
      <p className="mt-3 max-w-2xl text-charcoal/70">
        Discover trusted Punjabi wedding {category.toLowerCase()} in {city}. Every listing on Sada
        Vyah is a directory profile only — contact vendors directly by phone, email, website or
        social media, with no booking fees or middlemen.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SAMPLE_VENDORS.map((v) => (
          <div key={v.name} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <div className="mb-3 h-28 rounded-xl bg-blush/30" />
            <p className="font-medium text-charcoal">{v.name}</p>
            <p className="text-xs text-charcoal/50">{v.price}</p>
            <p className="mt-1 text-xs text-gold">★ {v.rating}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-xl text-charcoal">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-medium text-charcoal">
              How do I contact a {category.toLowerCase()} in {city}?
            </p>
            <p className="text-sm text-charcoal/60">
              Each profile lists phone, email, website and social links — reach out directly, no
              account needed on either side.
            </p>
          </div>
          <div>
            <p className="font-medium text-charcoal">Is Sada Vyah a booking platform?</p>
            <p className="text-sm text-charcoal/60">
              No — Sada Vyah is a directory for discovery and planning reference only.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
