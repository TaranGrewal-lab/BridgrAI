const PLANS = [
  { name: "Free", price: "£0", features: ["Basic listing", "Up to 3 photos", "Standard search placement"] },
  { name: "Silver", price: "£19/mo", features: ["Priority placement", "Up to 10 photos", "Basic analytics"] },
  { name: "Gold", price: "£49/mo", features: ["Top category placement", "Up to 25 photos", "Full analytics", "Featured badge"] },
  { name: "Platinum", price: "£99/mo", features: ["Top of all searches", "Unlimited photos", "Full analytics", "Homepage feature rotation"] },
];

export default function VendorSubscriptionPage() {
  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Subscription</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Upgrade your listing visibility in the directory. Subscriptions affect placement only —
        Sada Vyah never charges per lead or booking.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => (
          <div key={p.name} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <p className="font-heading text-xl text-charcoal">{p.name}</p>
            <p className="mt-1 text-2xl font-heading text-gold">{p.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button className="mt-5 w-full rounded-full bg-gold px-4 py-2 text-sm font-medium text-ivory">
              {p.name === "Free" ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
