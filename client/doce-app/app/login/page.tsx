"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError("Email ou senha incorretos");
      } else {
        window.location.href = callbackUrl;
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121212] border border-[#333] rounded-3xl p-8 shadow-2xl">
        <h1 className="text-[#f1a128] text-3xl font-black italic uppercase tracking-tighter mb-2">
          Do'cê
        </h1>
        <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-8">
          Acesso ao Sistema
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-1 block">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-white focus:border-[#f1a128] outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-1 block">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-white focus:border-[#f1a128] outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#f1a128] text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#f1a128]/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar no Sistema"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-xs">
          <p className="font-bold mb-2">Credenciais de teste:</p>
          <p>Admin: admin@doce.com / 123456</p>
          <p>Garçom: garcom@doce.com / 123456</p>
        </div>
      </div>
    </div>
  );
}