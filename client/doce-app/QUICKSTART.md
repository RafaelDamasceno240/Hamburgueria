# 🚀 Guia de Início Rápido - Autenticação

## Instalação

Todas as dependências já estão instaladas. Para verificar:

```bash
cd client/doce-app
npm list next-auth
# ou
pnpm list next-auth
```

## Iniciar a Aplicação

```bash
cd client/doce-app
pnpm dev
```

A aplicação estará disponível em: `http://localhost:3000`

## Teste o Login

1. Acesse: `http://localhost:3000/login`
2. Use uma das credenciais de teste:
   - **Admin**: admin@doce.com / 123456
   - **Garçom**: garcom@doce.com / 123456
3. Clique em "Entrar no Sistema"
4. Você será redirecionado para `/dashboard`

## Funcionalidades Implementadas

### ✅ Autenticação Básica
- Login com email e senha
- Logout seguro
- Persistência de sessão

### ✅ Proteção de Rotas
- Middleware no servidor protege rotas privadas
- Redirecionamento automático para login
- Componentes cliente com proteção adicional

### ✅ Gerenciamento de Usuário
- Exibição de nome e role do usuário
- Avatar personalizado
- Informações de sessão acessível globalmente

### ✅ Componentes Reutilizáveis
- `UserProfile` - Exibe dados do usuário + botão logout
- `LogoutButton` - Botão de logout isolado
- `ProtectedRoute` - Proteção de componentes
- `useAuth` - Hook para acessar sessão

## Exemplos de Uso

### Exemplo 1: Verificar se o usuário está autenticado

```tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function MyPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <p>Acesso negado</p>;

  return <p>Bem-vindo, {user?.name}!</p>;
}
```

### Exemplo 2: Proteger uma página inteira

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Painel de Admin</h1>
      {/* Conteúdo do admin aqui */}
    </ProtectedRoute>
  );
}
```

### Exemplo 3: Fazer logout programaticamente

```tsx
import { signOut } from "next-auth/react";

export default function LogoutExample() {
  const handleLogout = async () => {
    await signOut({ redirect: true, redirectTo: "/login" });
  };

  return <button onClick={handleLogout}>Sair do Sistema</button>;
}
```

## Modificar Credenciais de Teste

Edite o arquivo `auth.ts`:

```typescript
const validUsers = [
  { 
    id: "1", 
    name: "Admin", 
    email: "seu-email@example.com", 
    password: "sua-senha",
    role: "admin" 
  },
  // Adicione mais usuários aqui
];
```

## Próximas Etapas

### 1. Conectar com Banco de Dados
Modifique a função `authorize` em `auth.ts` para consultar seu banco:

```typescript
const user = await db.user.findUnique({
  where: { email: credentials.email }
});

if (user && await bcrypt.compare(credentials.password, user.password)) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
```

### 2. Implementar Hash de Senhas
Use `bcrypt` para armazenar senhas com segurança:

```bash
pnpm add bcryptjs
```

### 3. Adicionar 2FA (Autenticação de Dois Fatores)
- Integre Google Authenticator ou SMS
- Modifique os callbacks para incluir validação 2FA

### 4. Social Login (Google, GitHub)
```bash
pnpm add @auth/core
```

Adicione provedores ao `auth.ts`:
```typescript
import Google from "@auth/core/providers/google"

providers: [
  Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
]
```

## 🔒 Segurança em Produção

Checklist antes do deploy:

- [ ] Gerar `NEXTAUTH_SECRET` com `openssl rand -base64 32`
- [ ] Definir `NEXTAUTH_URL` corretamente
- [ ] Usar HTTPS
- [ ] Implementar rate limiting
- [ ] Adicionar CSRF protection
- [ ] Hash de senhas com bcrypt
- [ ] Implementar refresh tokens
- [ ] Logs de auditoria

## 📚 Documentação Completa

Consulte [AUTHENTICATION.md](./AUTHENTICATION.md) para documentação detalhada.

## 🐛 Problemas Comuns

**Q: Sessão não persiste após refresh da página**
A: Verifique se `NEXTAUTH_SECRET` está definido no `.env.local`

**Q: Componentes não veem a sessão**
A: Certifique-se que `SessionProvider` envolve todos os componentes no `layout.tsx`

**Q: Logout não redireciona para login**
A: Verifique a configuração de `redirectTo` no `signOut()`

## 📞 Suporte

Para mais informações, consulte:
- [NextAuth Docs](https://next-auth.js.org/)
- [Next.js Docs](https://nextjs.org/docs)
