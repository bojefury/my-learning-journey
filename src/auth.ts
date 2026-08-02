import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Role } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  assertAuthSecret,
  consumeLoginAttempt,
  safeRedirect,
  verifyPassword,
} from "@/lib/auth-security";

const credentialsSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(256),
});

function isRole(value: unknown): value is Role {
  return value === "USER" || value === "MANAGER" || value === "ADMIN";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: assertAuthSecret(),
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  providers: [
    Credentials({
      credentials: { email: {}, password: { type: "password" } },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        // Keying by normalized account prevents a client from evading the limit
        // by forging forwarding headers. Use a shared Redis limiter when scaled.
        const key = parsed.data.email;
        if (!consumeLoginAttempt(key)) return null;
        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user?.passwordHash) return null;
        if (!(await verifyPassword(user.passwordHash, parsed.data.password)))
          return null;
        return user;
      },
    }),
  ],
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub && isRole(token.role)) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      return safeRedirect(url, baseUrl);
    },
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
