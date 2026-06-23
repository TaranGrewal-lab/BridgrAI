"use client";

import { useAdminVendors, useFeatureVendor, useVerifyVendor } from "@/lib/hooks/useAdmin";

const VERIFICATION_COLOR: Record<string, string> = {
  VERIFIED: "bg-sage/30 text-charcoal",
  PENDING: "bg-gold/20 text-charcoal",
  UNVERIFIED: "bg-blush/30 text-charcoal",
  REJECTED: "bg-blush/30 text-charcoal",
};

export default function AdminVendorsPage() {
  const { data: vendors, isLoading, isError } = useAdminVendors();
  const verifyVendor = useVerifyVendor();
  const featureVendor = useFeatureVendor();

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Vendors</h1>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading vendors…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to manage live vendors here.
        </p>
      )}

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
            {vendors?.map((v) => (
              <tr key={v.id} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{v.businessName}</td>
                <td className="px-4 py-3 text-charcoal/60">{v.category.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{v.subscription?.plan ?? "FREE"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${VERIFICATION_COLOR[v.verification]}`}>
                    {v.verification}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => verifyVendor.mutate({ id: v.id, verification: "VERIFIED" })}
                    className="rounded-full bg-charcoal px-3 py-1 text-xs text-ivory"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => featureVendor.mutate({ id: v.id, isFeatured: !v.isFeatured })}
                    className="ml-2 rounded-full border border-charcoal/20 px-3 py-1 text-xs text-charcoal"
                  >
                    {v.isFeatured ? "Unfeature" : "Feature"}
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
