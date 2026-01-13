import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { env } from "./env.mjs";
import { db } from "./server/db";
import bcrypt from "bcryptjs";
import { checkBlockedEmail } from "@/server/utils/blocked-emails";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (!user?.password) {
          return null;
        }

        // Blocked emails cannot sign in
        const emailBlocked = await checkBlockedEmail(user.email!);
        if (emailBlocked) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) {
          return null;
        }

        // Require email verification for credential sign in
        if (!user.emailVerified) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
