"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-gray-400">Carregando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{session.user?.name}</p>
        <p className="text-xs text-gray-400">{session.user?.role || "Usuário"}</p>
      </div>
      <div className="w-10 h-10 bg-[#f1a128] rounded-full flex items-center justify-center text-[#121212] font-bold">
        {session.user?.name?.[0] || "U"}
      </div>
      <LogoutButton />
    </div>
  );
}
