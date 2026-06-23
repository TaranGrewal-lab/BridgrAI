"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { VendorSidebar } from "@/components/dashboard/VendorSidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { useCurrentVendor } from "@/lib/hooks/useVendors";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: vendor, isLoading } = useCurrentVendor();

  useEffect(() => {
    if (!isLoading && !vendor) router.replace("/vendor-onboarding");
  }, [isLoading, vendor, router]);

  if (isLoading || !vendor) {
    return <main className="px-6 py-16 text-center text-sm text-charcoal/50">Loading…</main>;
  }

  const planLabel = vendor.subscription?.plan
    ? `${vendor.subscription.plan.charAt(0)}${vendor.subscription.plan.slice(1).toLowerCase()} Partner`
    : "Free Listing";

  return (
    <div className="flex min-h-screen bg-ivory">
      <VendorSidebar active="Overview" />
      <div className="flex-1">
        <Topbar coupleName={vendor.businessName} weddingDate={planLabel} />
        {children}
      </div>
    </div>
  );
}
