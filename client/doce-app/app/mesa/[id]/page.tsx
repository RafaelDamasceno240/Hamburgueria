"use client";

import React, { useState, useEffect } from 'react'; // useEffect adicionado
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMesas } from "../../context/MesaContext"; 

interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface ItemPedido extends Produto {
  quantity: number;
}

const PRODUTOS: Produto[] = [
  { id: 1, name: "Salad Bacon", description: "Pão brioche, blend 160g, mussarela, bacon, alface e molho.", price: 29.90, category: "Burgers" },
  { id: 2, name: "American Cheese", description: "Pão Australiano, blend 160g, cheddar, bacon e cream cheese.", price: 31.90, category: "Burgers" },
  { id: 3, name: "Coca-Cola Lata", description: "350ml", price: 6.00, category: "Bebidas" },
];

export default function PaginaPedido() {
  const [carrinho, setCarrinho] = useState<ItemPedido[]>([]);
  const params = useParams();
  const router = useRouter();
  const { mesas, atualizarMesa } = useMesas(); // Importado 'mesas' para ler os dados

  const mesaId = Number(params.id);

  // LÓGICA PARA CARREGAR PEDIDO EXISTENTE AO EDITAR
  useEffect(() => {
    const mesaAtual = mesas.find(m => m.id === mesaId);
    if (mesaAtual && mesaAtual.status === 'ocupada' && mesaAtual.pedidos) {
      setCarrinho(mesaAtual.pedidos as ItemPedido[]);
    }
  }, [mesaId, mesas]);

  const adicionarAoPedido = (produto: Produto) => {
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...produto, quantity: 1 }];
    });
  };

  const removerDoPedido = (id: number) => {
    setCarrinho(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.quantity === 1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const confirmarPedidoFinal = () => {
    if (carrinho.length === 0) return;

    atualizarMesa(mesaId, {
      status: 'ocupada',
      valor: total,
      pedidos: carrinho,
      consumidor: `Cliente Mesa ${mesaId}`,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 'h'
    });

    router.push("/dashboard");
  };

  const total = carrinho.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      <div className="flex-1 p-8 overflow-y-auto border-r border-[#1a1a1a] scrollbar-hide">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-[#f1a128] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">Voltar</span>
          </Link>
          <h2 className="text-[#f1a128] font-black text-2xl uppercase italic tracking-tighter text-right">Mesa {mesaId} - Cardápio</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUTOS.map(produto => (
            <div key={produto.id} className="bg-[#121212] p-5 rounded-2xl border border-[#1a1a1a] flex justify-between items-center hover:border-[#f1a128]/30 transition-all group">
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-lg group-hover:text-[#f1a128] transition-colors">{produto.name}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{produto.description}</p>
                <span className="text-[#f1a128] font-black block mt-3 italic text-xl">R$ {produto.price.toFixed(2)}</span>
              </div>
              <button onClick={() => adicionarAoPedido(produto)} className="bg-[#f1a128] w-12 h-12 rounded-xl text-black font-black text-2xl hover:scale-110 active:scale-95 transition-all shadow-lg">+</button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[400px] bg-[#121212] flex flex-col shadow-2xl">
        <div className="p-6 border-b border-[#1a1a1a] flex justify-between items-center">
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Pedido Atual</h2>
          <span className="bg-[#f1a128] text-black px-3 py-1 rounded-lg text-xs font-black">{carrinho.reduce((acc, item) => acc + item.quantity, 0)} ITENS</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {carrinho.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
              <div className="text-6xl mb-4">🍔</div>
              <p className="text-xs font-black uppercase tracking-widest leading-loose">Nenhum item<br/>no pedido</p>
            </div>
          ) : (
            carrinho.map(item => (
              <div key={item.id} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-sm text-white">{item.name}</h4>
                  <span className="text-[#f1a128] font-black text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Quantidade</span>
                  <div className="flex items-center gap-3 bg-black/30 p-1 rounded-lg">
                    <button onClick={() => removerDoPedido(item.id)} className="w-7 h-7 bg-[#333] hover:bg-red-500/20 hover:text-red-500 rounded-md transition-colors font-bold">-</button>
                    <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                    <button onClick={() => adicionarAoPedido(item)} className="w-7 h-7 bg-[#333] hover:bg-[#f1a128] hover:text-black rounded-md transition-colors font-bold">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-[#0d0d0d] border-t border-[#333]">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-black italic tracking-tighter">
              <span>TOTAL</span>
              <span className="text-[#f1a128]">R$ {total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={confirmarPedidoFinal} disabled={carrinho.length === 0} className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${carrinho.length > 0 ? 'bg-[#f1a128] text-black shadow-[0_0_20px_rgba(241,161,40,0.3)] hover:scale-[1.02]' : 'bg-[#1a1a1a] text-gray-700 cursor-not-allowed border border-[#333]'}`}>Confirmar Pedido</button>
        </div>
      </div>
    </div>
  );
}