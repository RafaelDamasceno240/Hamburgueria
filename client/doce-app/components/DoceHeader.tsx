"use client"; // Necessário para usar hooks como useParams e useRouter

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import UserProfile from "./UserProfile";

export default function DoceHeader() {
  const params = useParams();
  const router = useRouter();
  
  // Captura o ID da mesa da URL (ex: /mesa/7 -> mesaId será "7")
  const mesaId = params?.id;

  return (
    <header className="w-full bg-[#121212] border-b border-[#332a1a] px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14">
          <Image
            src="/logodoce.svg"
            alt="Do'cê Hamburgueria"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-[#f1a128] font-bold text-xl tracking-wider leading-none font-sans">
            DO&apos;CE <span className="text-white">HAMBURGUERIA</span>
          </h1>
          <p className="text-[#666] text-[10px] uppercase tracking-[0.2em] mt-1">
            Ilicínea - MG
          </p>
        </div>
      </div>

      {/* Se houver um mesaId na URL, mostra os botões de controle da mesa */}
      {mesaId ? (
        <div className="flex items-center gap-3">
          <div className="bg-[#f1a128] text-black px-4 py-1.5 rounded-full font-black shadow-lg text-sm">
            Mesa {mesaId}
          </div>
          <button 
            onClick={() => router.push('/dashboard')} // Volta para o mapa de mesas
            className="bg-[#1a1a1a] border border-[#333] text-gray-300 px-4 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-[#222] transition-all"
          >
            Trocar Mesa
          </button>
          <div className="border-l border-[#333] pl-3 ml-3">
            <UserProfile />
          </div>
        </div>
      ) : (
        /* Caso contrário, mostra o status de sistema online e perfil do usuário */
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[#888] text-[10px] font-medium uppercase tracking-tighter">
              Sistema de Pedidos
            </span>
          </div>
          <div className="border-l border-[#333] pl-4">
            <UserProfile />
          </div>
        </div>
      )}
    </header>
  );
}
