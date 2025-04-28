"use client";

import dynamic from "next/dynamic";

// Disable SSR for the Monaco Editor
const Editor = dynamic(() => import("@/features/editor/components/editor"), {
  ssr: false,
});

export default function EditorPage({user}: {user: any}) {
  return (
    <div style={{ height: "90vh" }} className="pt-20">
      <div className="text-center text-2xl font-bold mb-4">Monaco Editor</div>
      <Editor user={user} />
    </div>
  );
}
