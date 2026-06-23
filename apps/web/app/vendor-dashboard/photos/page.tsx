export default function VendorPhotosPage() {
  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Photos</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">
          Upload Photo
        </button>
      </div>
      <p className="mt-2 text-sm text-charcoal/60">
        Showcase your work — these photos appear on your public profile gallery.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-sage/40 bg-blush/10 text-xs text-charcoal/40"
          >
            Empty Slot
          </div>
        ))}
      </div>
    </main>
  );
}
