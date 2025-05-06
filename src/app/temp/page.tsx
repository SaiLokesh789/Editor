"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme="vs-dark"
      />
    </div>
  );
}