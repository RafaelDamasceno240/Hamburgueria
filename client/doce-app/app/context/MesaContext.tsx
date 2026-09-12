"use client";

import React, { createContext, useContext, useState } from 'react';
import { ItemPedido } from '@/types/dashboard';

// 1. Definimos como é uma Mesa
export interface Mesa {
  id: number;
  status: 'livre' | 'ocupada';
  pessoas: number;
  horario: string;
  consumidor?: string;
  valor?: number;
  pedidos?: ItemPedido[];
}

// 2. Definimos o que o Contexto vai oferecer (Dados e Funções)
interface MesaContextType {
  mesas: Mesa[];
  atualizarMesa: (id: number, novosDados: Partial<Mesa>) => void;
}

const MesaContext = createContext<MesaContextType | undefined>(undefined);

// 3. O Provider (Onde os dados moram de verdade)
export function MesaProvider({ children }: { children: React.ReactNode }) {
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, status: 'livre', pessoas: 4, horario: '19:22h' },
    { id: 2, status: 'livre', pessoas: 4, horario: '19:22h' },
    { id: 3, status: 'livre', pessoas: 4, horario: '19:22h' },
    { id: 4, status: 'livre', pessoas: 4, horario: '19:22h' },
    { id: 5, status: 'livre', pessoas: 4, horario: '19:22h' },
    { id: 6, status: 'livre', pessoas: 4, horario: '19:22h' },
    { id: 7, status: 'ocupada', pessoas: 2, horario: '20:10h', consumidor: 'Rafael', valor: 45.90 },
  ]);

  const atualizarMesa = (id: number, novosDados: Partial<Mesa>) => {
    setMesas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...novosDados } : m))
    );
  };

  return (
    <MesaContext.Provider value={{ mesas, atualizarMesa }}>
      {children}
    </MesaContext.Provider>
  );
}

// 4. Hook para usar os dados em outras páginas
export const useMesas = () => {
  const context = useContext(MesaContext);
  if (!context) throw new Error("useMesas deve estar dentro de MesaProvider");
  return context;
};

// Dentro do MesaContext.tsx
export interface Mesa {
  id: number;
  status: 'livre' | 'ocupada';
  pessoas: number;
  horario: string;
  consumidor?: string;
  valor?: number;
  pedidos?: ItemPedido[]; // <-- Adicione ou verifique se esta linha existe
}