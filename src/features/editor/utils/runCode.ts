export async function runCode(
  code: string,
  language: string,
  input: string
): Promise<{
  output: string | null;
  error: string | null;
  stderr: string | null;
}> {
  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language, input }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.stderr || "Failed to execute code");
    }

    const data = await response.json();
    console.log("Data:", data);
    return {
      output: data.output,
      error: data.error,
      stderr: data.stderr,
    };
  } catch (error: any) {
    return {
      output: null,
      error: error.message,
      stderr: null,
    };
  }
}
