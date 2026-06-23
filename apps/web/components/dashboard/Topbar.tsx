export function Topbar({ coupleName, weddingDate }: { coupleName: string; weddingDate: string }) {
  return (
    <div className="flex items-center justify-between border-b border-sage/30 bg-white px-6 py-4">
      <div>
        <p className="text-sm text-charcoal/50">Welcome back,</p>
        <p className="font-heading text-xl text-charcoal">{coupleName} 💕</p>
        <p className="text-xs text-charcoal/40">Wedding Date: {weddingDate}</p>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="text-charcoal/50">
          🔔
        </button>
        <div className="h-9 w-9 rounded-full bg-blush" />
      </div>
    </div>
  );
}
