"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLogVendorAnalyticsEvent, useVendorBySlug } from "@/lib/hooks/useVendors";

export default function VendorProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: vendor, isLoading, isError } = useVendorBySlug(slug);
  const logEvent = useLogVendorAnalyticsEvent();

  useEffect(() => {
    if (vendor?.id) logEvent.mutate({ vendorId: vendor.id, type: "PROFILE_VIEW" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor?.id]);

  const handleContactClick = (type: string) => {
    if (vendor?.id) logEvent.mutate({ vendorId: vendor.id, type });
  };

  if (isLoading) {
    return <main className="px-6 py-16 text-center text-sm text-charcoal/50">Loading…</main>;
  }

  if (isError || !vendor) {
    return (
      <main className="px-6 py-16 text-center text-sm text-charcoal/50">
        This vendor profile could not be found.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-heading text-4xl text-charcoal">{vendor.businessName}</h1>
      <p className="mt-2 text-charcoal/60">
        {vendor.category.name} · {vendor.city}
      </p>
      {vendor.description && <p className="mt-4 text-charcoal/70">{vendor.description}</p>}

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {vendor.photos.length > 0
          ? vendor.photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt={vendor.businessName}
                className="aspect-square rounded-xl object-cover"
              />
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-blush/40" />
            ))}
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        {vendor.phone && (
          <a
            href={`tel:${vendor.phone}`}
            onClick={() => handleContactClick("PHONE_CLICK")}
            className="rounded-full bg-charcoal px-6 py-2 text-sm text-ivory"
          >
            Call
          </a>
        )}
        {vendor.email && (
          <a
            href={`mailto:${vendor.email}`}
            onClick={() => handleContactClick("EMAIL_CLICK")}
            className="rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal"
          >
            Email
          </a>
        )}
        {vendor.websiteUrl && (
          <a
            href={vendor.websiteUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleContactClick("WEBSITE_CLICK")}
            className="rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal"
          >
            Website
          </a>
        )}
        {vendor.instagramUrl && (
          <a
            href={vendor.instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleContactClick("INSTAGRAM_CLICK")}
            className="rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal"
          >
            Instagram
          </a>
        )}
      </section>
      <p className="mt-4 text-xs text-charcoal/40">
        Sada Vyah is a directory only — contact this vendor directly using the links above.
      </p>

      {vendor.reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl text-charcoal">Reviews</h2>
          <div className="mt-4 space-y-4">
            {vendor.reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-sage/30 p-4">
                <p className="text-sm font-medium text-charcoal">
                  {review.title ?? `★ ${review.rating}`}
                </p>
                {review.body && <p className="mt-1 text-sm text-charcoal/60">{review.body}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
