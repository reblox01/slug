 "use server";

import { signOut } from "@/auth";
import { db } from "../db";
import bcrypt from "bcryptjs";

export const handleSignOut = async () => {
  await signOut();
};

// checkBlockedEmail moved to src/server/utils/blocked-emails.ts to avoid circular imports

export const createUserWithPassword = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "User already exists." };
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hashed,
        name,
        emailVerified: new Date(),
      },
    });

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const verifyUserCredentials = async (email: string, password: string) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user?.password) {
    return null;
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }
  return user;
};