const EVENTS = ["Jaggo", "Mehndi", "Maiyan", "Anand Karaj", "Reception"];

const GUESTS = [
  {
    name: "Raj Singh",
    side: "Groom",
    invites: { Jaggo: true, Mehndi: false, Maiyan: false, "Anand Karaj": true, Reception: true },
  },
  {
    name: "Simran Kaur",
    side: "Bride",
    invites: { Jaggo: false, Mehndi: true, Maiyan: true, "Anand Karaj": true, Reception: true },
  },
  {
    name: "Harpreet Family",
    side: "Shared",
    invites: { Jaggo: true, Mehndi: true, Maiyan: false, "Anand Karaj": true, Reception: true },
  },
];

export default function GuestsPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Guests</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">
          Add Guest
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-sage/40 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Side</th>
              {EVENTS.map((e) => (
                <th key={e} className="px-4 py-3 font-medium">
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GUESTS.map((g) => (
              <tr key={g.name} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{g.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{g.side}</td>
                {EVENTS.map((e) => (
                  <td key={e} className="px-4 py-3">
                    <span
                      className={
                        g.invites[e as keyof typeof g.invites]
                          ? "text-sage"
                          : "text-charcoal/30"
                      }
                    >
                      {g.invites[e as keyof typeof g.invites] ? "✓" : "✗"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
