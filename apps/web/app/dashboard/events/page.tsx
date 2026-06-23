"use client";

import Link from "next/link";
import { useEvents } from "@/lib/hooks/useEvents";
import { useCurrentWedding } from "@/lib/hooks/useWedding";

export default function EventsPage() {
  const { data: wedding } = useCurrentWedding();
  const { data: events, isLoading, isError } = useEvents(wedding?.id ?? "");

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Events</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">+ Add Event</button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading events…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the planning API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          live events here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <Link
            key={event.id}
            href={`/dashboard/events/${event.id}`}
            className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-wide text-gold">{event.side}</p>
            <p className="mt-1 font-heading text-lg text-charcoal">{event.name}</p>
            <p className="text-xs text-charcoal/50">
              {event.date ? new Date(event.date).toLocaleDateString() : "Date TBC"}
              {event.venueName ? ` · ${event.venueName}` : ""}
            </p>
            <span className="mt-3 inline-block rounded-full bg-blush/40 px-2 py-0.5 text-xs text-charcoal">
              {event.status}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
