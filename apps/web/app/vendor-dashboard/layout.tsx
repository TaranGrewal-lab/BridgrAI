import { VendorSidebar } from "@/components/dashboard/VendorSidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <VendorSidebar active="Overview" />
      <div className="flex-1">
        <Topbar coupleName="Royal Regency" weddingDate="Platinum Partner" />
        {children}
      </div>
    </div>
  );
}
