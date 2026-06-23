"use client";

import { useGuests, useUpdateInvite } from "@/lib/hooks/useGuests";
import { useCurrentWedding } from "@/lib/hooks/useWedding";

export default function GuestsPage() {
  const { data: wedding } = useCurrentWedding();
  const weddingId = wedding?.id ?? "";
  const { data: guests, isLoading, isError } = useGuests(weddingId);
  const updateInvite = useUpdateInvite(weddingId);

  const events = Array.from(
    new Set(guests?.flatMap((g) => g.invites.map((i) => i.eventId)) ?? []),
  );

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Guests</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">
          Add Guest
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading guests…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the planning API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          live guests here.
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-sage/40 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Side</th>
              {events.map((eventId) => (
                <th key={eventId} className="px-4 py-3 font-medium">
                  {eventId.slice(0, 6)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guests?.map((g) => (
              <tr key={g.id} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{g.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{g.side}</td>
                {events.map((eventId) => {
                  const invite = g.invites.find((i) => i.eventId === eventId);
                  return (
                    <td key={eventId} className="px-4 py-3">
                      <button
                        onClick={() =>
                          invite &&
                          updateInvite.mutate({
                            inviteId: eventId,
                            data: { isInvited: !invite.isInvited },
                          })
                        }
                        className={invite?.isInvited ? "text-sage" : "text-charcoal/30"}
                      >
                        {invite?.isInvited ? "✓" : "✗"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
