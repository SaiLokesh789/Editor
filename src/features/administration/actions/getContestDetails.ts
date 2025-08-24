import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { db } from "@/drizzle/db";
import { ContestTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getContestDetails(contestId: string) {
  const user = await getCurrentUser({ withFullUser: true });
  if (!user?.id) throw new Error("Unauthorized");

  const contest = await db
    .select()
    .from(ContestTable)
    .where(eq(ContestTable.id,contestId))
    .execute();

  if (contest.length === 0) {
    throw new Error("Contest not found");
  }

  return contest[0];
}
