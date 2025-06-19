import EditorPage from "../temp";
import { Suspense } from "react";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorNavBar from "@/features/editor/components/editorNavBar";

export default async function EditorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ probId: string }>;
}) {
  const { probId } = await params;
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col w-full h-full">
      <EditorNavBar />
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center overflow-auto">
        <ResizablePanelGroup direction="horizontal" className=" h-full">
          <ResizablePanel defaultSize={50} className="min-w-[450px]">
            {children}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} className="min-w-[450px]">
            <div className="h-full w-full">
              <Suspense fallback={<div>Loading editor...</div>}>
                <EditorPage user={user} probId={probId} />
              </Suspense>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
