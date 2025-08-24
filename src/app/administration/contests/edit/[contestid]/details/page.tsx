import { getContestDetails } from "@/features/administration/actions/getContestDetails";
import ContestDetailsOverviewEditForm from "@/features/administration/components/contestDetailsEditForm";
import { notFound } from "next/navigation";

export default async function editContestOverviewPage({
  params,
}: {
  params: Promise<{ contestid: string }>;
}) {
  const { contestid } = await params;
  try {
    const contestDetails = await getContestDetails(contestid);
    return <ContestDetailsOverviewEditForm contestDetails={contestDetails} />;
  } catch (error) {
    console.error("Error fetching contest details:", error);
    return notFound();
  }
}