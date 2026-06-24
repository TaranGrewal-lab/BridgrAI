"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { usePublicWebsite, useSubmitRsvp } from "@/lib/hooks/useWebsite";

export default function PublicWeddingWebsitePage() {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { data: site, isLoading, isError } = usePublicWebsite(subdomain);
  const submitRsvp = useSubmitRsvp(subdomain);

  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventIds, setEventIds] = useState<string[]>([]);
  const [rsvpStatus, setRsvpStatus] = useState<"ATTENDING" | "DECLINED">("ATTENDING");
  const [plusOnes, setPlusOnes] = useState(0);
  const [mealPreference, setMealPreference] = useState("");

  if (isLoading) {
    return <main className="px-6 py-16 text-center text-sm text-charcoal/50">Loading…</main>;
  }

  if (isError || !site) {
    return (
      <main className="px-6 py-16 text-center text-sm text-charcoal/50">
        This wedding website could not be found.
      </main>
    );
  }

  const { wedding } = site;
  const coupleName = [wedding.brideName, wedding.groomName].filter(Boolean).join(" & ");

  const toggleEvent = (id: string) => {
    setEventIds((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRsvp.mutate({
      guestName,
      email: email || undefined,
      phone: phone || undefined,
      eventIds,
      rsvpStatus,
      plusOnes,
      mealPreference: mealPreference || undefined,
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {wedding.coverImageUrl && (
        <img
          src={wedding.coverImageUrl}
          alt={coupleName}
          className="aspect-[16/9] w-full rounded-2xl object-cover"
        />
      )}

      <header className="mt-8 text-center">
        <h1 className="font-heading text-4xl text-charcoal">{coupleName || "Our Wedding"}</h1>
        <p className="mt-2 text-charcoal/60">
          {wedding.weddingDate ? new Date(wedding.weddingDate).toLocaleDateString() : ""}
          {wedding.city ? ` · ${wedding.city}` : ""}
          {wedding.country ? `, ${wedding.country}` : ""}
        </p>
      </header>

      {site.storyContent && (
        <section className="mt-10">
          <h2 className="font-heading text-2xl text-charcoal">Our Story</h2>
          <p className="mt-3 whitespace-pre-line text-charcoal/70">{site.storyContent}</p>
        </section>
      )}

      {site.venueInfo && (
        <section className="mt-10">
          <h2 className="font-heading text-2xl text-charcoal">Venue</h2>
          <p className="mt-3 text-charcoal/70">{site.venueInfo}</p>
          {site.mapEmbedUrl && (
            <iframe
              src={site.mapEmbedUrl}
              className="mt-4 h-64 w-full rounded-xl border border-sage/30"
              loading="lazy"
            />
          )}
        </section>
      )}

      {wedding.events.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-2xl text-charcoal">Events</h2>
          <div className="mt-3 space-y-2">
            {wedding.events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-sage/30 bg-white p-4 text-sm text-charcoal/70"
              >
                <span className="font-medium text-charcoal">{event.name}</span>
                {event.date && (
                  <span className="ml-2 text-charcoal/50">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {site.registryLinks && (site.registryLinks as { url?: string }).url && (
        <section className="mt-10">
          <h2 className="font-heading text-2xl text-charcoal">Gift Registry</h2>
          <a
            href={(site.registryLinks as { url?: string }).url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded-full border border-charcoal/20 px-6 py-2 text-sm text-charcoal"
          >
            View Registry
          </a>
        </section>
      )}

      <section className="mt-12 rounded-2xl border border-sage/30 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl text-charcoal">RSVP</h2>

        {submitRsvp.isSuccess ? (
          <p className="mt-4 text-sm text-charcoal/70">
            Thank you — your RSVP has been received.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              required
              placeholder="Your full name"
              className="w-full rounded-xl border border-sage/30 p-3 text-sm"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                placeholder="Email (optional)"
                className="w-full rounded-xl border border-sage/30 p-3 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Phone (optional)"
                className="w-full rounded-xl border border-sage/30 p-3 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {wedding.events.length > 0 && (
              <div>
                <p className="text-sm font-medium text-charcoal">Which events will you attend?</p>
                <div className="mt-2 space-y-2">
                  {wedding.events.map((event) => (
                    <label key={event.id} className="flex items-center gap-2 text-sm text-charcoal/70">
                      <input
                        type="checkbox"
                        checked={eventIds.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                      />
                      {event.name}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRsvpStatus("ATTENDING")}
                className={`flex-1 rounded-full border px-4 py-2 text-sm ${
                  rsvpStatus === "ATTENDING"
                    ? "border-gold bg-blush/20 text-charcoal"
                    : "border-sage/30 text-charcoal/60"
                }`}
              >
                Attending
              </button>
              <button
                type="button"
                onClick={() => setRsvpStatus("DECLINED")}
                className={`flex-1 rounded-full border px-4 py-2 text-sm ${
                  rsvpStatus === "DECLINED"
                    ? "border-gold bg-blush/20 text-charcoal"
                    : "border-sage/30 text-charcoal/60"
                }`}
              >
                Can't Attend
              </button>
            </div>

            {rsvpStatus === "ATTENDING" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  min={0}
                  placeholder="Plus ones"
                  className="w-full rounded-xl border border-sage/30 p-3 text-sm"
                  value={plusOnes}
                  onChange={(e) => setPlusOnes(Number(e.target.value))}
                />
                <input
                  placeholder="Meal preference (optional)"
                  className="w-full rounded-xl border border-sage/30 p-3 text-sm"
                  value={mealPreference}
                  onChange={(e) => setMealPreference(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitRsvp.isPending}
              className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-ivory"
            >
              {submitRsvp.isPending ? "Submitting…" : "Submit RSVP"}
            </button>
            {submitRsvp.isError && (
              <p className="text-xs text-red-500">
                Something went wrong submitting your RSVP. Please try again.
              </p>
            )}
          </form>
        )}
      </section>
    </main>
  );
}
