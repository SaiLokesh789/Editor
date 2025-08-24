"use server";
import { db } from "@/drizzle/db";
import { ProblemTable, ProblemModeratorsTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export const addModerator = async (problemId: string, userId: string) => {
  const problem = await db.query.ProblemTable.findFirst({
    where: eq(ProblemTable.id, problemId),
  });

  if (!problem) {
    throw new Error("Problem not found");
  }
  const existingModerator = await db.query.ProblemModeratorsTable.findFirst({
    where: and(
      eq(ProblemModeratorsTable.problemId, problemId),
      eq(ProblemModeratorsTable.userId, userId)
    ),
  });

  if (existingModerator) {
    throw new Error("User is already a moderator for this problem");
  }

  await db.insert(ProblemModeratorsTable).values({
    problemId,
    userId,
  });
};

export const removeModerator = async (problemId: string, userId: string) => {
  const problem = await db.query.ProblemTable.findFirst({
    where: eq(ProblemTable.id, problemId),
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  const existingModerator = await db.query.ProblemModeratorsTable.findFirst({
    where: and(
      eq(ProblemModeratorsTable.problemId, problemId),
      eq(ProblemModeratorsTable.userId, userId)
    ),
  });

  if (!existingModerator) {
    throw new Error("User is not a moderator for this problem");
  }

  await db
    .delete(ProblemModeratorsTable)
    .where(
      and(
        eq(ProblemModeratorsTable.problemId, problemId),
        eq(ProblemModeratorsTable.userId, userId)
      )
    );
};

export const getProblemModerators = async (problemId: string) => {
  const moderators = await db.query.ProblemModeratorsTable.findMany({
    where: eq(ProblemModeratorsTable.problemId, problemId),
    with: {
      user: {
        columns: {
          id: true,
          username: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return moderators.map((mod) => ({
    ...mod.user,
    assignedAt: mod.assignedAt,
  }));
};

export const isModerator = async (
  userId: string,
  problemId: string
): Promise<boolean> => {
  const moderator = await db.query.ProblemModeratorsTable.findFirst({
    where: and(
      eq(ProblemModeratorsTable.problemId, problemId),
      eq(ProblemModeratorsTable.userId, userId)
    ),
  });

  return !!moderator;
};
