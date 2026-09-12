import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // Rotas que são acessíveis sem autenticação
  const isPublicRoute =
    nextUrl.pathname === "/login" ||
    nextUrl.pathname === "/" ||
    nextUrl.pathname.startsWith("/api/auth");

  // Rotas que precisam de autenticação
  const isProtectedRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/mesa") ||
    nextUrl.pathname.startsWith("/admin");

  // Redireciona para login se não autenticado em rota protegida
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Redireciona para dashboard se já autenticado e tenta acessar login
  if (nextUrl.pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};