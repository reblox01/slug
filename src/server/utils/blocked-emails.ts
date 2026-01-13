import { db } from "@/server/db";

export const checkBlockedEmail = async (email: string) => {
  const result = await db.blockedEmails.findFirst({
    where: { email },
  });
  return !!result;
};

