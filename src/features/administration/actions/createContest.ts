"use server";

import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { db } from "@/drizzle/db";
import { ContestTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { z } from "zod";

const contestSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});

export default async function createContest(formData: FormData) {
  const user = await getCurrentUser({ withFullUser: true });
  if (!user?.id) throw new Error("Unauthorized");
  const data = {
    name: formData.get("name")?.toString(),
    startDate: formData.get("startDate")?.toString(),
    startTime: formData.get("startTime")?.toString(),
    endDate: formData.get("endDate")?.toString(),
    endTime: formData.get("endTime")?.toString(),
  };

  const parsed = contestSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }

  const startDateTime = new Date(
    `${parsed.data.startDate}T${parsed.data.startTime}`
  );
  const endDateTime = new Date(`${parsed.data.endDate}T${parsed.data.endTime}`);

  if (startDateTime >= endDateTime) {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again."
      )}`
    )
  }

  const [created] = await db
    .insert(ContestTable)
    .values({
      name: parsed.data.name,
      startTime: startDateTime,
      endTime: endDateTime,
      createdBy: user.id,
      createdByName: user.username || "Unknown User",
    })
    .returning();

  redirect(`/administration/contests/edit/${created.id}`);
}
