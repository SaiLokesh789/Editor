import { Button } from "@/components/ui/button";
import getCurrentUserContests from "@/features/administration/actions/getCurrentUserContests";
import Link from "next/link";

export default async function currentUserContestsPage() {
  const contests = await getCurrentUserContests();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Contests</h1>
      <ul className="space-y-4">
        {contests.map((contest) => (
          <li
            key={contest.id}
            className="p-4 border rounded shadow flex justify-between"
          >
            <h2 className="text-xl font-semibold">{contest.name}</h2>
            <p className="text-sm text-gray-500">
              Created at: {new Date(contest.createdAt).toLocaleString()}
            </p>
            <Button variant="submit" asChild>
              <Link href={`/administration/contests/edit/${contest.id}/details`}>
                Edit Contest
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
