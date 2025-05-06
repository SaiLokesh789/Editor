import EditorPage from "../temp";
import { Suspense } from "react";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
    <div className="flex h-screen items-center justify-center">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full border md:min-w-[450px] h-full"
      >
        <ResizablePanel defaultSize={50} className="min-w-[450px]">
          {children}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="min-w-[450px]">
          <div className="h-full w-full">
            <ScrollArea className="h-full w-full">
              <Suspense fallback={<div>Loading editor...</div>}>
                <EditorPage user={user} probId={probId}/>
              </Suspense>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
