
import React from "react";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";

export const TestPanel: React.FC = () => {
  return (
    <div className="h-screen w-full p-6">
      <ResizablePanelGroup direction="horizontal" className="min-h-[200px] border rounded-lg">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full w-full items-center justify-center p-6 text-black dark:text-white">
            <span className="font-semibold">Linkes Panel mit Text</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full w-full items-center justify-center p-6 text-black dark:text-white">
            <span className="font-semibold">Rechtes Panel mit Text</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TestPanel;
