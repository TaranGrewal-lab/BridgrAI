"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { useCurrentWedding } from "@/lib/hooks/useWedding";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: wedding, isLoading } = useCurrentWedding();

  useEffect(() => {
    if (!isLoading && !wedding) router.replace("/onboarding");
  }, [isLoading, wedding, router]);

  if (isLoading || !wedding) {
    return <main className="px-6 py-16 text-center text-sm text-charcoal/50">Loading…</main>;
  }

  const coupleName = [wedding.brideName, wedding.groomName].filter(Boolean).join(" & ") || "Welcome";
  const weddingDate = wedding.weddingDate
    ? new Date(wedding.weddingDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "Not set yet";

  return (
    <div className="flex min-h-screen bg-ivory">
      <Sidebar active="Dashboard" />
      <div className="flex-1">
        <Topbar coupleName={coupleName} weddingDate={weddingDate} />
        {children}
      </div>
    </div>
  );
}
