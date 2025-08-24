"use server";

import { db } from "@/drizzle/db";
import { ProblemTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { z } from "zod";

const problemSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  problemStatement: z
    .string()
    .min(1, { message: "Problem statement is required" }),
  inputFormat: z.string().min(1, { message: "Input format is required" }),
  outputFormat: z.string().min(1, { message: "Output format is required" }),
  constraints: z.string().min(1, { message: "Constraints are required" }),
});

export async function createProblem(formData: FormData) {
  const user = await getCurrentUser({ withFullUser: true });
  if (!user?.id) throw new Error("Unauthorized");

  const data = {
    title: String(formData.get("title") ?? ""),
    problemStatement: String(formData.get("problemStatement") ?? ""),
    inputFormat: String(formData.get("inputFormat") ?? ""),
    outputFormat: String(formData.get("outputFormat") ?? ""),
    constraints: String(formData.get("constraints") ?? ""),
  };

  const parsed = problemSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }

  const [created] = await db
    .insert(ProblemTable)
    .values({
      ...parsed.data,
      createdBy: user.id,
      createdByName: user.username || "Unknown User",
    })
    .returning();

  redirect(`/administration/problems/edit/${created.id}`);
}
