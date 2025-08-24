"use server";

import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { db } from "@/drizzle/db";
import { ProblemTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";

export default async function getCurrentUserProblems() {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  if (!user?.id) throw new Error("Unauthorized");

  const problems = await db
    .select()
    .from(ProblemTable)
    .where(eq(ProblemTable.createdBy, user.id))
    .orderBy(desc(ProblemTable.createdAt));

  return problems;
}
