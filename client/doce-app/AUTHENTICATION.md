# Sistema de Autenticação com Auth.js (NextAuth)

## 📋 Visão Geral

Sistema completo de autenticação para a Hamburgueria usando Auth.js (NextAuth v5) com suporte a credenciais, sessões JWT e proteção de rotas.

## 🚀 Funcionalidades

- ✅ Autenticação com Credenciais
- ✅ Gerenciamento de Sessões JWT
- ✅ Proteção de Rotas com Middleware
- ✅ Componentes de Logout
- ✅ Hooks personalizados
- ✅ Proteção de componentes
- ✅ Tratamento de erros
- ✅ Diferentes papéis de usuário (roles)

## 📁 Estrutura de Arquivos

```
client/doce-app/
├── auth.ts                          # Configuração principal do NextAuth
├── middleware.ts                    # Proteção de rotas no servidor
├── .env.local                       # Variáveis de ambiente
├── app/
│   ├── layout.tsx                  # Layout com SessionProvider
│   ├── login/
│   │   └── page.tsx                # Página de login
│   ├── dashboard/
│   │   └── page.tsx                # Dashboard protegido
│   └── api/
│       └── auth/[...nextauth]/
│           └── route.ts             # Rota da API de autenticação
├── components/
│   ├── LogoutButton.tsx            # Botão de logout
│   ├── UserProfile.tsx             # Perfil do usuário
│   └── ProtectedRoute.tsx          # Componente de proteção
└── hooks/
    └── useAuth.ts                   # Hook para acessar sesão
```

## 🔐 Credenciais de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@doce.com | 123456 |
| Garçom | garcom@doce.com | 123456 |

## 💡 Como Usar

### 1. **Verificar Sessão do Usuário**

```tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Carregando...</p>;
  if (!isAuthenticated) return <p>Não autenticado</p>;

  return <p>Bem-vindo, {user?.name}!</p>;
}
```

### 2. **Usar o Componente de Proteção**

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Painel Administrativo</h1>
    </ProtectedRoute>
  );
}
```

### 3. **Adicionar Logout no Header**

```tsx
import UserProfile from "@/components/UserProfile";

export default function Header() {
  return (
    <header>
      <h1>Hamburgueria</h1>
      <UserProfile />
    </header>
  );
}
```

### 4. **Fazer Logout Programaticamente**

```tsx
import { signOut } from "next-auth/react";

async function handleLogout() {
  await signOut({ redirect: true, redirectTo: "/login" });
}
```

## 🛡️ Segurança

### Configurações Aplicadas:

1. **JWT Strategy**: Sessão baseada em JWT com expiração de 30 dias
2. **Middleware**: Valida autenticação em rotas protegidas
3. **NEXTAUTH_SECRET**: Chave de criptografia das sessões
4. **Validação de Credenciais**: Verificação segura do email e senha

## 🔧 Configuração de Produção

Antes de fazer deploy:

1. **Gerar nova chave secreta**:
   ```bash
   openssl rand -base64 32
   ```

2. **Atualizar .env.local**:
   ```
   NEXTAUTH_SECRET=sua_chave_gerada_aqui
   NEXTAUTH_URL=https://seu-dominio.com
   ```

3. **Conectar com banco de dados**:
   - Modificar a função `authorize` em `auth.ts`
   - Adicionar validação com banco de dados real
   - Implementar hash de senhas (bcrypt)

## 📦 Dependências

- `next-auth@5.0.0-beta.31` - Framework de autenticação
- `next@16.2.4` - Framework Next.js
- `react@19.2.4` - React

## 🚨 Variáveis de Ambiente Necessárias

```env
# Obrigatória em produção
NEXTAUTH_SECRET=sua_chave_secreta

# URL da aplicação
NEXTAUTH_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Erro: "SessionProvider is required"
**Solução**: Certifique-se que `SessionProvider` está envolvendo seus componentes no `layout.tsx`.

### Erro: "Callbacks not called"
**Solução**: Verifique se os callbacks estão corretamente definidos em `auth.ts`.

### Sessão não persiste após refresh
**Solução**: Confirme que `NEXTAUTH_SECRET` está configurado no `.env.local`.

## 📚 Referências

- [NextAuth Documentation](https://next-auth.js.org/)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [JWT Documentation](https://jwt.io/)

## 🎯 Próximas Melhorias

- [ ] Integração com banco de dados
- [ ] Autenticação com Google/GitHub
- [ ] 2FA (Autenticação de dois fatores)
- [ ] Recuperação de senha
- [ ] Auditoria de login
- [ ] Refresh token automático
