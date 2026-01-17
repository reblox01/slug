import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { env } from "./env.mjs";
import { db } from "./server/db";
import bcrypt from "bcryptjs";
import { checkBlockedEmail } from "@/server/utils/blocked-emails";
import { loginLimiter } from "@/utils/login-limiter";
import { headers } from "next/headers";

class RateLimitError extends CredentialsSignin {
  code = "rate-limit";
}

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
        const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";

        try {
          loginLimiter.check(ip);
        } catch (error) {
          throw new RateLimitError();
        }

        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (!user?.password) {
          loginLimiter.registerFailure(ip);
          return null;
        }

        // Blocked emails cannot sign in
        const emailBlocked = await checkBlockedEmail(user.email!);
        if (emailBlocked) {
          loginLimiter.registerFailure(ip);
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) {
          loginLimiter.registerFailure(ip);
          return null;
        }

        // Require email verification for credential sign in
        if (!user.emailVerified) {
          loginLimiter.registerFailure(ip);
          return null;
        }

        loginLimiter.reset(ip);
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
