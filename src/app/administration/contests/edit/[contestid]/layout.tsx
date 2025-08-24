import { EditContestNavBar } from "@/features/administration/components/contestEditNavBar";

export default function ContestDetailsEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center py-8 px-2 sm:px-4">
      <div className="w-full max-w-4xl rounded-lg shadow-lg bg-white">
        <EditContestNavBar />
        <div className="p-6 sm:p-8 md:p-10">{children}</div>
      </div>
    </div>
  );
}
