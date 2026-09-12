export type DashboardTab = "mesas" | "cardapio";

export interface DashboardMenuItem {
  id: DashboardTab;
  label: string;
  icon: string;
}

export interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

export interface ItemPedido {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Mesa {
  id: number;
  status: 'livre' | 'ocupada';
  valor?: number;
  consumidor?: string;
  pessoas?: number;
  horario?: string;
  pedidos?: ItemPedido[];
}