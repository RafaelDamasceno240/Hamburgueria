"use client";
import { DashboardMenuItem, DashboardSidebarProps } from "@/types/dashboard";

const menuItems: DashboardMenuItem[] = [
  { id: "mesas", label: "Mapa de Mesas", icon: "📍" },
  { id: "cardapio", label: "Cardápio", icon: "🍔" },
];

export default function SidebarDashboard({
  activeTab,
  setActiveTab,
}: DashboardSidebarProps) {
  return (
    <aside className="w-64 bg-[#0f0f0f] border-r border-[#332a1a] p-6 flex flex-col gap-2">
      <h2 className="text-[#f1a128] font-bold text-xl mb-8 px-2 uppercase tracking-tighter">
        Do&apos;ce Dashboard
      </h2>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            activeTab === item.id
              ? "bg-[#f1a128] text-black shadow-lg shadow-[#f1a128]/20"
              : "text-[#666] hover:bg-[#1a1a1a] hover:text-[#aaa]"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </aside>
  );
}