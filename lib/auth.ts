import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      async authorize(credentials) {
        console.log('ENV EMAIL:', process.env.ADMIN_EMAIL);
        console.log('ENV PASS:', process.env.ADMIN_PASSWORD?.substring(0, 10));
        console.log('INPUT EMAIL:', credentials?.email);
        console.log('INPUT PASS LENGTH:', credentials?.password?.length);
        const email = process.env.ADMIN_EMAIL;
        const hashedPassword = process.env.ADMIN_PASSWORD;
        if (!email || !hashedPassword) return null;
        if (credentials?.email !== email) return null;
        if (!credentials?.password) return null;
        const valid = await bcrypt.compare(
          credentials.password,
          hashedPassword
        );
        if (!valid) return null;
        return { id: "admin", email, name: "Beheerder" };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.email = token.email as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
