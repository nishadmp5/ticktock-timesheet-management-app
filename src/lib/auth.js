import { users } from "./mockData/users";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find((u) => u.email === credentials.email);
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            remember: credentials.remember === "true",
          };
        }
        return null;
      },
    },
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecret",
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user , account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.remember = user.remember ?? false;
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = token.iat + (user.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24); 
      }
      return token;
    },
  },
};
