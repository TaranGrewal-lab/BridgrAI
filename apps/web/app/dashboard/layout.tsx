import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <Sidebar active="Dashboard" />
      <div className="flex-1">
        <Topbar coupleName="Simran & Gurpreet" weddingDate="14 August 2027" />
        {children}
      </div>
    </div>
  );
}
