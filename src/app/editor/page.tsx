import EditorPage from "./temp";
import { Suspense } from "react";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
export default async function Editor() {
  const user = await getCurrentUser();
  return (
    <div>
      <Suspense fallback={<div>Loading editor...</div>}>
        <EditorPage user={user} />
      </Suspense>
    </div>
  );
}
