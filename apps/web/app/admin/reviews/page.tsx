const REVIEWS = [
  { vendor: "Royal Regency", author: "Simran K.", rating: 5, body: "Absolutely stunning venue, staff were wonderful." },
  { vendor: "AK Musik", author: "Gurpreet S.", rating: 4, body: "Great energy on the night, slight delay setting up." },
  { vendor: "Dream Decor", author: "Anonymous", rating: 1, body: "Suspicious — possible fake review, flagged for review." },
];

export default function AdminReviewsPage() {
  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Reviews</h1>
      <div className="mt-6 space-y-4">
        {REVIEWS.map((r) => (
          <div key={r.author + r.vendor} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium text-charcoal">{r.vendor} · {r.author}</p>
              <p className="text-gold">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
            </div>
            <p className="mt-2 text-sm text-charcoal/60">{r.body}</p>
            <button className="mt-3 rounded-full border border-blush px-3 py-1 text-xs text-charcoal">
              Remove Review
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
