// filepath: /Users/sailokesh/Documents/nextjstutorial/editor/src/features/editor/hooks/useEditorLogic.ts
import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import {
  getStoredData,
  setStoredData,
  deleteStoredData,
} from "@/utils/localStorageUtils";
import { defaultCodeMap } from "@/features/editor/configure/defaultCodes";

export const useEditorLogic = (probId: string, userId: string) => {
  const [language, setLanguage] = useState(
    () => getStoredData("language") || "cpp"
  );
  const [userCode, setUserCode] = useState(" ");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outputTime, setOutputTime] = useState("");
  const [outputMemory, setOutputMemory] = useState("");
  const [error, setError] = useState("");
  const [stderr, setStderr] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const storedData = getStoredData(`problem_${probId}_${language}_${userId}`);
    if (storedData) {
      setUserCode(storedData);
      setStoredData(
        `problem_${probId}_${language}_${userId}_updatedTime`,
        new Date().toISOString()
      );
    }

    const localstorageLanguage = getStoredData("language") || "cpp";
    setLanguage(localstorageLanguage);
  }, []);

  useEffect(() => {
    const storedCode = getStoredData(`problem_${probId}_${language}_${userId}`);
    setUserCode(
      storedCode || defaultCodeMap[language as keyof typeof defaultCodeMap]
    );
    setStoredData("language", language);
  }, [language]);

  const handleEditorChange = useCallback(
    debounce((value: string | undefined) => {
      if (value === defaultCodeMap[language as keyof typeof defaultCodeMap]) {
        deleteStoredData(`problem_${probId}_${language}_${userId}`);
        deleteStoredData(`problem_${probId}_${language}_${userId}_updatedTime`);
      } else {
        setUserCode(value || "");
        setStoredData(`problem_${probId}_${language}_${userId}`, value);
        setStoredData(
          `problem_${probId}_${language}_${userId}_updatedTime`,
          new Date().toISOString()
        );
      }
    }, 500),
    [language]
  );

  return {
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
  };
};
