/**
 * Este arquivo é um EXEMPLO de como integrar Auth.js com um banco de dados real.
 * Descomente e adapte conforme sua aplicação.
 */

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { compare } from "bcryptjs"
// import { db } from "@/lib/db" // Seu cliente de BD

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Senha", type: "password" },
//       },
//       async authorize(credentials) {
//         // Validar credenciais
//         if (!credentials.email || !credentials.password) {
//           throw new Error("Email e senha são obrigatórios")
//         }

//         // Buscar usuário no banco
//         const user = await db.user.findUnique({
//           where: { email: credentials.email as string },
//         })

//         if (!user) {
//           throw new Error("Usuário não encontrado")
//         }

//         // Verificar senha
//         const passwordMatch = await compare(
//           credentials.password as string,
//           user.passwordHash
//         )

//         if (!passwordMatch) {
//           throw new Error("Senha incorreta")
//         }

//         // Retornar usuário
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//         session.user.role = token.role as string
//       }
//       return session
//     },
//     async signIn({ user, account }) {
//       // Log de login no banco
//       // await db.loginLog.create({
//       //   data: {
//       //     userId: user.id,
//       //     timestamp: new Date(),
//       //   },
//       // })
//       return true
//     },
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 dias
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// })

/**
 * GUIA DE IMPLEMENTAÇÃO
 * 
 * 1. Instalar dependências:
 *    pnpm add bcryptjs @prisma/client
 *    pnpm add -D prisma
 * 
 * 2. Criar schema Prisma (schema.prisma):
 *    model User {
 *      id        String   @id @default(cuid())
 *      email     String   @unique
 *      name      String
 *      passwordHash String
 *      role      String   @default("waiter")
 *      createdAt DateTime @default(now())
 *      updatedAt DateTime @updatedAt
 *    }
 * 
 * 3. Gerar migrations:
 *    pnpm exec prisma migrate dev --name init
 * 
 * 4. Seed do banco com usuários:
 *    import { hash } from "bcryptjs"
 *    import { PrismaClient } from "@prisma/client"
 *    
 *    const db = new PrismaClient()
 *    
 *    async function main() {
 *      await db.user.createMany({
 *        data: [
 *          {
 *            email: "admin@doce.com",
 *            name: "Admin",
 *            passwordHash: await hash("123456", 10),
 *            role: "admin",
 *          },
 *          {
 *            email: "garcom@doce.com",
 *            name: "Garçom",
 *            passwordHash: await hash("123456", 10),
 *            role: "waiter",
 *          },
 *        ],
 *        skipDuplicates: true,
 *      })
 *    }
 *    
 *    main().catch(console.error)
 * 
 * 5. Usar o código acima (descomente)
 * 
 * 6. Rodar a aplicação:
 *    pnpm dev
 */
