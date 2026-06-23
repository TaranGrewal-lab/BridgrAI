const THEMES = ["Ivory Classic", "Blush Romance", "Sage Garden", "Gold Royale"];

export default function WebsiteBuilderPage() {
  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Wedding Website</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">Publish</button>
      </div>
      <p className="mt-1 text-sm text-charcoal/50">sadavyah.com/w/simran-and-gurpreet</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Theme</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {THEMES.map((t, i) => (
                <button
                  key={t}
                  className={`rounded-xl border p-3 text-center text-xs font-medium ${
                    i === 0 ? "border-gold bg-blush/20 text-charcoal" : "border-sage/30 text-charcoal/60"
                  }`}
                >
                  <div className="mb-2 h-12 rounded-lg bg-sage/20" />
                  {t}
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
              defaultValue=""
            />
          </section>

          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Venue & Map</h2>
            <input
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              placeholder="Venue name and address"
            />
            <input
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              placeholder="Google Maps embed URL"
            />
          </section>

          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Gift Registry</h2>
            <input
              className="mt-3 w-full rounded-xl border border-sage/30 p-3 text-sm"
              placeholder="Registry link (e.g. John Lewis, Amazon)"
            />
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg text-charcoal">Countdown</h2>
            <p className="mt-2 font-heading text-3xl text-gold">94 days</p>
            <p className="text-xs text-charcoal/50">until 14 August 2027</p>
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
