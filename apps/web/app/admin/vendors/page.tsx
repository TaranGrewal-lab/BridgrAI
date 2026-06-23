const VENDORS = [
  { name: "Royal Regency", category: "Venues", plan: "Platinum", verification: "Verified" },
  { name: "Dream Decor", category: "Decorators", plan: "Gold", verification: "Verified" },
  { name: "AK Musik", category: "DJs", plan: "Silver", verification: "Pending" },
  { name: "Snap Stories", category: "Photographers", plan: "Free", verification: "Unverified" },
];

const VERIFICATION_COLOR: Record<string, string> = {
  Verified: "bg-sage/30 text-charcoal",
  Pending: "bg-gold/20 text-charcoal",
  Unverified: "bg-blush/30 text-charcoal",
};

export default function AdminVendorsPage() {
  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Vendors</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Business</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Verification</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {VENDORS.map((v) => (
              <tr key={v.name} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{v.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{v.category}</td>
                <td className="px-4 py-3 text-charcoal/60">{v.plan}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${VERIFICATION_COLOR[v.verification]}`}>
                    {v.verification}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="rounded-full bg-charcoal px-3 py-1 text-xs text-ivory">Verify</button>
                  <button className="ml-2 rounded-full border border-charcoal/20 px-3 py-1 text-xs text-charcoal">
                    Feature
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
