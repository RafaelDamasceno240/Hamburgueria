import DoceHeader from "@/components/DoceHeader";
import { Metadata } from "next";

export const metadata: Metadata = {title: "Dashboard - Doce App",};
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Header fixo no topo */}
      <DoceHeader />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Conteúdo principal com scroll independente */}
        <main className="flex-1 overflow-y-auto p-0">
          {children}
        </main>
      </div>
    </div>
  );
}