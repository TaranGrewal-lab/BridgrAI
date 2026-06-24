import type { Metadata } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

// Top Punjabi-wedding-diaspora hub cities across UK/Canada/USA/India/Australia.
const TOP_CITIES = [
  "london",
  "birmingham",
  "toronto",
  "vancouver",
  "surrey",
  "new-york",
  "chandigarh",
  "amritsar",
  "jalandhar",
  "melbourne",
];

// Highest-demand vendor categories — paired with TOP_CITIES this yields the
// curated top-50 city x category SEO landing pages required by the MVP brief.
const TOP_CATEGORIES = ["venues", "photographers", "decorators", "caterers", "djs"];

interface CategoryCityPageProps {
  params: Promise<{ category: string; city: string }>;
}

interface SeoVendor {
  id: string;
  businessName: string;
  slug: string;
  ratingAverage: string;
  ratingCount: number;
  priceRangeMin: string | null;
}

function humanize(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return TOP_CATEGORIES.flatMap((category) =>
    TOP_CITIES.map((city) => ({ category, city })),
  );
}

async function fetchVendors(category: string, city: string): Promise<SeoVendor[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendors?category=${category}&city=${encodeURIComponent(humanize(city))}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
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

export default async function CategoryCityPage({ params }: CategoryCityPageProps) {
  const { category: categorySlug, city: citySlug } = await params;
  const category = humanize(categorySlug);
  const city = humanize(citySlug);
  const vendors = await fetchVendors(categorySlug, citySlug);

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

      {vendors.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {vendors.map((v) => (
            <a
              key={v.id}
              href={`/vendors/profile/${v.slug}`}
              className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 h-28 rounded-xl bg-blush/30" />
              <p className="font-medium text-charcoal">{v.businessName}</p>
              {v.priceRangeMin && (
                <p className="text-xs text-charcoal/50">From £{v.priceRangeMin}</p>
              )}
              <p className="mt-1 text-xs text-gold">
                ★ {v.ratingAverage} ({v.ratingCount})
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-charcoal/50">
          No {category.toLowerCase()} listed in {city} yet — check back soon, or{" "}
          <a href="/vendors" className="text-gold underline">
            browse all vendors
          </a>
          .
        </p>
      )}

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
