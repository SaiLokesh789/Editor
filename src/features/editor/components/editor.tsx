"use client";
import Editor from "@monaco-editor/react";
import { debounce } from "@/utils/debounce";
import LanguageSelector from "@/features/editor/components/languageSelector";
import { Button } from "@/components/ui/button";
import { runCode } from "@/features/editor/utils/runCode";
import InputField from "./inputField";
import { useEditorLogic } from "@/features/editor/hooks/useEditorLogic";

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
  } = useEditorLogic(probId, userId);

  const handleRunCode = async () => {
    const result = await runCode(userCode, language, input);
    console.log("Output:", result.output);
    console.log("Error:", result.error);
    console.log("Stderr:", result.stderr);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-4 flex justify-between items-center">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <div className="flex items-center justify-center px-4 w-full h-fit">
        <Editor
          height="63vh"
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
      <div className="p-4 flex items-center gap-4">
        <Button variant="submit">Submit</Button>
        <Button variant="submit" onClick={handleRunCode}>
          Run
        </Button>
      </div>
      <div className="px-4 flex items-center gap-4">
        <InputField setInput={setInput} probId={probId} />
      </div>
    </div>
  );
}
