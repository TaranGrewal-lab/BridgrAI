"use client";

import { useAdminReviews, useDeleteReview } from "@/lib/hooks/useAdmin";

export default function AdminReviewsPage() {
  const { data: reviews, isLoading, isError } = useAdminReviews();
  const deleteReview = useDeleteReview();

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Reviews</h1>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading reviews…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to moderate live reviews here.
        </p>
      )}

      <div className="mt-6 space-y-4">
        {reviews?.map((r) => (
          <div key={r.id} className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium text-charcoal">
                {r.vendor.businessName} · {r.user.email}
              </p>
              <p className="text-gold">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
            </div>
            <p className="mt-2 text-sm text-charcoal/60">{r.body}</p>
            <button
              onClick={() => deleteReview.mutate(r.id)}
              className="mt-3 rounded-full border border-blush px-3 py-1 text-xs text-charcoal"
            >
              Remove Review
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
