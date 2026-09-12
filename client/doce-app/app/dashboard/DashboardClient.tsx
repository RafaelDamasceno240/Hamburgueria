"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SidebarDashboard from "@/components/dashboard/Sidebar";
import { DashboardTab } from "@/types/dashboard";
import { useMesas, Mesa } from "../context/MesaContext"; 
import { useRouter } from "next/navigation";

const cardapioData = [
  { id: 1, name: "Salad Bacon", price: 29.90, category: "Burgers", description: "Pão brioche, blend 160g..." },
  { id: 2, name: "American Cheese", price: 31.90, category: "Burgers", description: "Pão Australiano..." },
  { id: 3, name: "Coca-Cola Lata", price: 6.00, category: "Bebidas", description: "350ml" },
];

export default function GestaoMesas() {
  const { mesas, atualizarMesa } = useMesas(); 
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>("mesas");
  const [filtro, setFiltro] = useState<'todas' | 'livre' | 'ocupada'>('todas');

  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirDetalhesMesa = (mesa: Mesa) => {
    setMesaSelecionada(mesa);
    setIsModalOpen(true);
  };

  const fecharConta = () => {
    if (mesaSelecionada) {
      atualizarMesa(mesaSelecionada.id, {
        status: 'livre',
        consumidor: undefined,
        valor: 0,
        pedidos: [] 
      });
      setIsModalOpen(false);
      setMesaSelecionada(null);
    }
  };

  // FUNÇÃO DE IMPRESSÃO
  const imprimirPedido = () => {
    window.print();
  };

  const mesasFiltradas = mesas.filter(mesa => {
    if (filtro === 'todas') return true;
    return mesa.status === filtro;
  });

  return (
    <div className="flex min-h-screen bg-[#121212] text-white font-sans relative">
      {/* Classe print:hidden oculta a sidebar na impressão */}
      <div className="print:hidden flex">
        <SidebarDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main oculto na impressão para focar apenas no modal */}
      <main className="flex-1 p-8 overflow-y-auto print:hidden">
        {activeTab === "mesas" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex gap-3">
                <button 
                  onClick={() => setFiltro('todas')} 
                  className={`px-6 py-2 rounded-lg font-bold text-sm uppercase transition-all ${
                    filtro === 'todas' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-gray-500 hover:bg-[#222]'
                  }`}
                >
                  Todas
                </button>
                <button 
                  onClick={() => setFiltro('livre')} 
                  className={`px-6 py-2 border rounded-lg font-bold text-sm uppercase transition-all ${
                    filtro === 'livre' ? 'bg-green-500 text-black border-green-500' : 'bg-[#1a1a1a] border-green-900/50 text-green-500 hover:bg-green-900/10'
                  }`}
                >
                  Livre
                </button>
                <button 
                  onClick={() => setFiltro('ocupada')} 
                  className={`px-6 py-2 border rounded-lg font-bold text-sm uppercase transition-all ${
                    filtro === 'ocupada' ? 'bg-red-500 text-white border-red-500' : 'bg-[#1a1a1a] border-red-900/50 text-red-500 hover:bg-red-900/10'
                  }`}
                >
                  Ocupada
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mesasFiltradas.map((mesa) => (
                <div key={mesa.id}>
                  {mesa.status === 'ocupada' ? (
                    <button onClick={() => abrirDetalhesMesa(mesa)} className="w-full text-left block group">
                      <MesaCard mesa={mesa} />
                    </button>
                  ) : (
                    <Link href={`/mesa/${mesa.id}`} className="group block">
                      <MesaCard mesa={mesa} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cardapio" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-4xl font-black text-[#f1a128] uppercase italic tracking-tighter mb-8">Cardápio</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cardapioData.map(item => (
                  <div key={item.id} className="bg-[#1a1a1a] p-5 rounded-2xl border border-[#333] flex justify-between items-center group">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#f1a128] transition-colors">{item.name}</h3>
                      <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                      <p className="text-[#f1a128] font-black mt-3 italic">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}
      </main>

      {/* --- MODAL DE RESUMO DA MESA --- */}
      {isModalOpen && mesaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 print:bg-white print:p-0">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 print:bg-white print:text-black print:shadow-none print:border-none print:rounded-none">
            
            <div className="p-6 border-b border-[#333] flex justify-between items-center bg-[#1d1d1d] print:bg-white print:border-black">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#f1a128] print:text-black">Mesa {mesaSelecionada.id}</h2>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest print:text-gray-600">Resumo do Pedido</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white text-2xl print:hidden">×</button>
            </div>

            <div className="p-6 max-h-[300px] overflow-y-auto space-y-3 scrollbar-hide print:max-h-none print:overflow-visible">
               <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest border-b border-white/5 pb-2 print:text-black print:border-black">Itens Consumidos</p>
               
               {mesaSelecionada.pedidos && mesaSelecionada.pedidos.length > 0 ? (
                 mesaSelecionada.pedidos.map((item, idx) => (
                   <div key={idx} className="flex justify-between items-center bg-[#222] p-4 rounded-2xl border border-white/5 print:bg-white print:border-b print:border-gray-200 print:rounded-none">
                     <div className="flex flex-col">
                       <span className="font-bold text-white text-sm print:text-black">
                         {item.quantity}x {item.name}
                       </span>
                       <span className="text-[10px] text-gray-500 uppercase">
                         Un: R$ {item.price.toFixed(2)}
                       </span>
                     </div>
                     <div className="text-right">
                       <span className="text-[#f1a128] font-black italic text-sm print:text-black">
                         R$ {(item.price * item.quantity).toFixed(2)}
                       </span>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="py-8 text-center opacity-30 italic text-sm text-gray-500">
                    Nenhum detalhe de item encontrado.
                 </div>
               )}
            </div>

            <div className="p-8 bg-[#0d0d0d] border-t border-[#333] space-y-6 print:bg-white print:border-black">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 uppercase text-xs font-black tracking-widest print:text-black">Total da Conta</span>
                <div className="text-3xl font-black italic text-[#f1a128] tracking-tighter print:text-black">
                  R$ {mesaSelecionada.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* AÇÕES - Print:hidden esconde os botões no papel */}
              <div className="space-y-3 print:hidden">
                <button 
                  onClick={imprimirPedido}
                  className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Imprimir Pedido
                </button>

                <button 
                  onClick={() => router.push(`/mesa/${mesaSelecionada.id}`)}
                  className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#f1a128] text-black hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Editar / Adicionar Itens
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="py-4 rounded-xl font-black uppercase text-xs tracking-widest border border-[#333] hover:bg-[#222] transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={fecharConta}
                    className="py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Fechar Mesa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* SUB-COMPONENTE MESA CARD (SEM ALTERAÇÕES) */
function MesaCard({ mesa }: { mesa: Mesa }) {
  return (
    <div className={`h-full relative overflow-hidden rounded-xl border-2 transition-all hover:scale-[1.02] ${
      mesa.status === 'ocupada' 
        ? 'bg-[#1a1a1a] border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
        : 'bg-[#1a1a1a] border-[#333] group-hover:border-[#f1a128]/50'
    }`}>
      <div className={`py-2 text-center font-black text-lg ${
        mesa.status === 'ocupada' ? 'bg-red-600/20 text-red-500' : 'bg-[#222] text-[#f1a128] group-hover:bg-[#f1a128] group-hover:text-black'
      }`}>{mesa.id}</div>
      <div className="p-4 flex flex-col items-center gap-2">
        {mesa.status === 'ocupada' ? (
          <>
            <span className="text-gray-400 text-[10px] uppercase tracking-widest">Consumidor</span>
            <span className="text-white font-bold">{mesa.consumidor || "Cliente"}</span>
            <span className="text-[#f1a128] font-black text-lg mt-1 italic">
              R$ {mesa.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </>
        ) : (
          <div className="py-4 opacity-30 text-gray-500 text-xs uppercase font-bold group-hover:text-[#f1a128]">Mesa Livre</div>
        )}
        <div className="w-full mt-2 pt-2 border-t border-white/5 flex justify-between items-center text-gray-500 text-[10px]">
          <span>👥 {mesa.pessoas}p</span>
          <span>🕒 {mesa.horario}</span>
        </div>
      </div>
    </div>
  );
}