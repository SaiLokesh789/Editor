import { getCurrentUser } from "@/auth/nextjs/currentUser";

export default async function Editor({
  params,
}: {
  params: { probId: string };
}) {
  const { probId } = await params;
  const user = await getCurrentUser();
  return (
    <div className="flex h-screen items-center justify-center ">
      one {probId}
    </div>
  );
}
