"use client";
import Editor from "@monaco-editor/react";
import LanguageSelector from "@/features/editor/components/languageSelector";
import { Button } from "@/components/ui/button";
import { runCode } from "@/features/editor/utils/runCode";
import InputField from "@/features/editor/components/inputField";
import { useEditorLogic } from "@/features/editor/hooks/useEditorLogic";
import { ScrollArea } from "@/components/ui/scroll-area";
import OutputField from "@/features/editor/components/outputField";

export default function CodeEditor({
  user,
  probId,
}: {
  user: any;
  probId: string;
}) {
  const userId: string = user ? user.id : "null";
  const {
    language,
    setLanguage,
    userCode,
    setUserCode,
    input,
    setInput,
    handleEditorChange,
    output,
    setOutput,
    outputTime,
    setOutputTime,
    outputMemory,
    setOutputMemory,
    error,
    setError,
    stderr,
    setStderr,
    isRunning,
    setIsRunning,
  } = useEditorLogic(probId, userId);

  const handleRunCode = async () => {
    setIsRunning(true);
    const result = await runCode(userCode, language, input);
    setIsRunning(false);
    //FIXME: Remove the console.log in production
    // console.log("Output:", result.output);
    setOutput(result.output || "");
    // console.log("Time:", result.time);
    setOutputTime(result.time || "");
    // console.log("Memory:", result.memory);
    setOutputMemory(result.memory || "");
    // console.log("Error:", result.error);
    setError(result.error || "");
    // console.log("Stderr:", result.stderr);
    setStderr(result.stderr || "");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <ScrollArea>
        <div className="p-4 flex justify-between items-center">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
        <div className="flex items-center justify-center mx-4 h-fit">
          <Editor
            height="61vh"
            width="99%"
            language={language}
            value={userCode}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              fontSize: 13,
              fontWeight: "600",
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              wordWrap: "off",
              cursorBlinking: "expand",
              tabSize: 3,
              automaticLayout: true, // Automatically adjust layout without smooth transitions
            }}
          />
        </div>
        <div className="m-4 flex items-center gap-4">
          <InputField setInput={setInput} probId={probId} />
        </div>
        <div>
          <OutputField
            input={input}
            output={output}
            outputTime={outputTime}
            outputMemory={outputMemory}
            error={error}
            stderr={stderr}
            isRunning={isRunning}
          />
        </div>
      </ScrollArea>
      <div className="p-3 flex items-center gap-4 border-t-2">
        <Button variant="submit" disabled={isRunning}>
          Submit
        </Button>
        <Button variant="submit" onClick={handleRunCode} disabled={isRunning}>
          Run
        </Button>
      </div>
    </div>
  );
}
