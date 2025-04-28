"use client";
import Editor from "@monaco-editor/react";
import { useState, useCallback, useEffect } from "react";
import {
  getStoredData,
  setStoredData,
  deleteStoredData,
} from "@/utils/localStorageUtils";
import { debounce } from "@/utils/debounce";
import { cleanUpExpiredQuestions } from "../utils/handleCleanupOfQuestions";

const defaultCppCode =
  "#include <bits/stdc++.h>\nusing namespace std;\n#define ll long long\n\nvoid solve()\n{\n\t\n}\n\nint main() {\n\tll t;\n\tcin >> t;\n\twhile (t--)\n\t{\n\t\tsolve();\n\t}\n\treturn 0;\n}";

// TODO: Make this dynamic based on the problem name and language
const problemName = "1";
const language = "cpp";

export default function CodeEditor({ user }: { user: any }) {
  console.log("user", user);

  const userId: string = user ? user.id : "null";

  const [userCode, setUserCode] = useState(defaultCppCode);
  if (getStoredData(`problem_${problemName}_${language}_${userId}_updatedTime`) != null) {
    setStoredData(
      `problem_${problemName}_${language}_${userId}_updatedTime`,
      new Date().toISOString()
    );
  }

  cleanUpExpiredQuestions();

  useEffect(() => {
    const storedData = getStoredData(`problem_${problemName}_${language}_${userId}`);
    if (storedData) {
      setUserCode(storedData);
      setStoredData(
        `problem_${problemName}_${language}_${userId}_updatedTime`,
        new Date().toISOString()
      );
    }
  }, []);

  // Update userCode when typing stops
  const handleEditorChange = useCallback(
    debounce((value: string | undefined) => {
      if (value === defaultCppCode) {
        // Remove the keys from local storage
        deleteStoredData(`problem_${problemName}_${language}_${userId}`);
        deleteStoredData(`problem_${problemName}_${language}_${userId}_updatedTime`);
      } else {
        // Save the data to local storage
        setStoredData(`problem_${problemName}_${language}_${userId}`, value);
        setStoredData(
          `problem_${problemName}_${language}_${userId}_updatedTime`,
          new Date().toISOString()
        );
      }
    }, 500), // 500ms debounce delay
    []
  );

  return (
    <Editor
      height="500px"
      defaultLanguage="cpp"
      defaultValue={userCode}
      theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
}
