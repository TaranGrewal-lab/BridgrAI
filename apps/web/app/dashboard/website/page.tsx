"use client";

import { useEffect, useState } from "react";
import { useUpdateWebsite, useWebsite } from "@/lib/hooks/useWebsite";
import { useCurrentWedding } from "@/lib/hooks/useWedding";

const THEMES = ["ivory-classic", "blush-romance", "sage-garden", "gold-royale"];
const THEME_LABELS: Record<string, string> = {
  "ivory-classic": "Ivory Classic",
  "blush-romance": "Blush Romance",
  "sage-garden": "Sage Garden",
  "gold-royale": "Gold Royale",
};

export default function WebsiteBuilderPage() {
  const { data: wedding } = useCurrentWedding();
  const weddingId = wedding?.id ?? "";
  const { data: site, isLoading, isError } = useWebsite(weddingId);
  const updateWebsite = useUpdateWebsite(weddingId);

  const [theme, setTheme] = useState("ivory-classic");
  const [storyContent, setStoryContent] = useState("");
  const [venueInfo, setVenueInfo] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [registryUrl, setRegistryUrl] = useState("");

  useEffect(() => {
    if (!site) return;
    setTheme(site.theme);
    setStoryContent(site.storyContent ?? "");
    setVenueInfo(site.venueInfo ?? "");
    setMapEmbedUrl(site.mapEmbedUrl ?? "");
    setRegistryUrl((site.registryLinks as { url?: string } | null)?.url ?? "");
  }, [site]);

  const handlePublish = () => {
    updateWebsite.mutate({
      theme,
      storyContent,
      venueInfo,
      mapEmbedUrl,
      registryLinks: { url: registryUrl },
      isPublished: true,
    });
  };

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Wedding Website</h1>
        <button
          onClick={handlePublish}
          className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory"
        >
          {updateWebsite.isPending ? "Saving…" : "Publish"}
        </button>
      </div>
      <p className="mt-1 text-sm text-charcoal/50">
        sadavyah.com/w/{site?.subdomain ?? "your-wedding"}
      </p>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading website…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the planning API yet — connect <code>NEXT_PUBLIC_API_URL</code> to edit
          your live wedding website here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Theme</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`rounded-xl border p-3 text-center text-xs font-medium ${
                    theme === t ? "border-gold bg-blush/20 text-charcoal" : "border-sage/30 text-charcoal/60"
                  }`}
                >
                  <div className="mb-2 h-12 rounded-lg bg-sage/20" />
                  {THEME_LABELS[t]}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Our Story</h2>
            <textarea
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              rows={4}
              placeholder="Tell your guests how you met..."
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
            />
          </section>

          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Venue & Map</h2>
            <input
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              placeholder="Venue name and address"
              value={venueInfo}
              onChange={(e) => setVenueInfo(e.target.value)}
            />
            <input
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              placeholder="Google Maps embed URL"
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
            />
          </section>

          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Gift Registry</h2>
            <input
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              placeholder="Registry link (e.g. John Lewis, Amazon)"
              value={registryUrl}
              onChange={(e) => setRegistryUrl(e.target.value)}
            />
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Status</h2>
            <p className="mt-2 font-heading text-2xl text-gold">
              {site?.isPublished ? "Published" : "Draft"}
            </p>
            <p className="text-xs text-charcoal/50">
              {site?.isPublished
                ? "Your site is live for guests."
                : "Publish to make your site visible to guests."}
            </p>
          </section>
          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">RSVP Form</h2>
            <p className="mt-2 text-xs text-charcoal/50">
              Guests submit RSVPs directly via your public site — responses sync to your Guest List automatically.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
