import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";

export default function OutputField({
  input,
  output,
  outputTime,
  outputMemory,
  error,
  stderr,
  isRunning,
}: {
  input: string;
  output: string;
  outputTime: string;
  outputMemory: string;
  error: string;
  stderr: string;
  isRunning: boolean;
}) {
  if (isRunning) {
    return (
      <div className="m-4 mt-0 flex flex-col gap-4 border rounded p-2">
        Running...
      </div>
    );
  }
  if (!outputTime && !outputMemory && !output && !error && !stderr) {
    return null;
  }
  return (
    <div className="m-4 mt-0 flex flex-col gap-4 border rounded p-2">
      <div>Status : {error ? "Error" : "Sucessfully Executed"}</div>
      {outputTime && (
        <div className="gap-2 flex flex-col">
          <div className="flex gap-2">
            <div>Time: {outputTime}</div>
            <Separator className="mx-2 border" />
            <div>Memory: {outputMemory}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div>Input</div>
            <Textarea
              className="h-24 resize-none"
              defaultValue={input}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-1">
            <div>Output</div>
            <Textarea
              className="h-24 resize-none"
              defaultValue={output ? output : ""}
              readOnly
            />
          </div>
        </div>
      )}
      {error && (
        <>
          <div className="text-red-500">Error: {error}</div>
          <div className="text-red-500">Stderr: {stderr}</div>
        </>
      )}
    </div>
  );
}
