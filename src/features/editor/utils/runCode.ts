// function parseOutputWithTimeAndMemory(raw: string): {
//   output: string;
//   time: string;
//   memory: string;
// } {
//   const lines = raw.split("\n");
//   const outputLines: string[] = [];
//   let time = "";
//   let memory = "";

//   for (const line of lines) {
//     const trimmedLine = line.trim();

//     if (trimmedLine.startsWith("Elapsed (wall clock) time")) {
//       const match = trimmedLine.match(/:\s*(\d+):(\d+\.\d{2})/);
//       if (match) {
//         const minutes = parseInt(match[1], 10);
//         const seconds = parseFloat(match[2]);
//         time = (minutes * 60 + seconds).toFixed(4);
//       }
//     } else if (trimmedLine.startsWith("Maximum resident set size")) {
//       const match = trimmedLine.match(/:\s*(\d+)/);
//       if (match) {
//         const kb = parseInt(match[1], 10);
//         memory = (kb / 1024).toFixed(2) + " MB";
//       }
//     } else if (
//       trimmedLine !== "" &&
//       !trimmedLine.includes(":") &&
//       !trimmedLine.startsWith("Command being timed")
//     ) {
//       outputLines.push(trimmedLine);
//     }
//   }

//   return {
//     output: outputLines.join("\n"),
//     time: time || "N/A",
//     memory: memory || "N/A",
//   };
// }

function parseOutputWithTimeAndMemory(raw: string): {
  output: string;
  time: string;
  memory: string;
} {
  const lines = raw.split("\n");
  const outputLines: string[] = [];
  let time = "";
  let memory = "";

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("Elapsed (wall clock) time")) {
      // Match formats like "0:00.00"
      const match = trimmedLine.match(/:\s*(\d+):(\d+\.\d{2})/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseFloat(match[2]);
        time = (minutes * 60 + seconds).toFixed(4);
      }
    } else if (trimmedLine.startsWith("Maximum resident set size")) {
      const match = trimmedLine.match(/:\s*(\d+)/);
      if (match) {
        const kb = parseInt(match[1], 10);
        memory = (kb / 1024).toFixed(2) + " MB";
      }
    } else if (
      trimmedLine !== "" &&
      !trimmedLine.startsWith("Command being timed") &&
      !trimmedLine.includes(":")
    ) {
      // Assume this is actual output
      outputLines.push(trimmedLine);
    } else if (
      trimmedLine.includes("Command being timed") &&
      trimmedLine.includes("\t")
    ) {
      // There may be actual output on this line before "Command being timed"
      const [maybeOutput] = trimmedLine.split("\t");
      if (maybeOutput && !maybeOutput.includes(":")) {
        outputLines.push(maybeOutput);
      }
    }
  }

  return {
    output: outputLines.join("\n"),
    time,
    memory,
  };
}

export async function runCode(
  code: string,
  language: string,
  input: string
): Promise<{
  output: string | null;
  time: string | null;
  memory: string | null;
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
    const { output, time, memory } = parseOutputWithTimeAndMemory(
      data.output || ""
    );
    //FIXME: Remove the console.log in production
    // console.log("Raw:", data.output);
    return {
      output: output,
      time: time,
      memory: memory,
      error: data.error,
      stderr: data.stderr,
    };
  } catch (error: any) {
    return {
      output: null,
      time: null,
      memory: null,
      error: error.message,
      stderr: null,
    };
  }
}
