"use client";

import dynamic from "next/dynamic";

// Disable SSR for the Monaco Editor
const CodeEditor = dynamic(
  () => import("@/features/editor/components/editor"),
  {
    ssr: false,
  }
);

export default function EditorPage({
  user,probId
}: {
  user: { id: string; role: "user" | "admin" } | null;
  probId: string;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <CodeEditor user={user} probId={probId} />
    </div>
  );
}
