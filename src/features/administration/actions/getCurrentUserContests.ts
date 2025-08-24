"use server";

import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { db } from "@/drizzle/db";
import { ContestTable } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

export default async function getCurrentUserContests() {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  if (!user?.id) throw new Error("Unauthorized");

  const contests = await db
    .select()
    .from(ContestTable)
    .where(eq(ContestTable.createdBy, user.id))
    .orderBy(desc(ContestTable.createdAt));

  return contests;
}
