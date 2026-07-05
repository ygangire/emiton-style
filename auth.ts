import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { verifyPassword } from "@/lib/auth/password";
import { getUserByEmail } from "@/lib/auth/users";
import { prisma } from "@/lib/prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.firstName =
          typeof token.firstName === "string" ? token.firstName : "";
        session.user.lastName =
          typeof token.lastName === "string" ? token.lastName : "";
        session.user.email = typeof token.email === "string" ? token.email : "";
        session.user.role = typeof token.role === "string" ? token.role : "";
      }

      return session;
    },
  },
});
