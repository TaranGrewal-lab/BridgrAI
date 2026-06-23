interface VendorProfilePageProps {
  params: Promise<{ slug: string }>;
}

export default async function VendorProfilePage({ params }: VendorProfilePageProps) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-heading text-4xl text-charcoal capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="mt-2 text-charcoal/60">Photography · London, UK</p>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-blush/40" />
        ))}
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <a href="tel:" className="rounded-full bg-charcoal px-6 py-2 text-sm text-ivory">
          Call
        </a>
        <a href="mailto:" className="rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal">
          Email
        </a>
        <a href="#" className="rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal">
          Website
        </a>
        <a href="#" className="rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal">
          Instagram
        </a>
      </section>
      <p className="mt-4 text-xs text-charcoal/40">
        Sada Vyah is a directory only — contact this vendor directly using the links above.
      </p>
    </main>
  );
}
