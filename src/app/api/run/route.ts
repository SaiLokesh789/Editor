import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { generateDockerCommand } from "@/features/codeRunner/utils/GenerateDockerCommand";
import { randomUUID } from "crypto"; // Add this import

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, language, input } = body;

    // Create a unique temp directory for each request
    const tempDir = path.join(process.cwd(), "temp", randomUUID());
    fs.mkdirSync(tempDir, { recursive: true });

    let fileName = "";
    let compileCommand = "";
    let runCommand = "";
    let dockerImage = "";

    if (language === "cpp") {
      fileName = "main.cpp";
      dockerImage = "cpp-runner";
      compileCommand = "g++ main.cpp -o main.out";
      runCommand = "timeout 2s ./main.out";
    } else if (language === "python") {
      fileName = "main.py";
      dockerImage = "python-runner";
      compileCommand = "";
      runCommand = "timeout 2s python3 main.py";
    } else if (language === "c") {
      fileName = "main.c";
      dockerImage = "c-runner";
      compileCommand = "gcc main.c -o main.out";
      runCommand = "timeout 2s ./main.out";
    } else if (language === "java") {
      fileName = "Main.java";
      dockerImage = "java-runner";
      compileCommand = "javac Main.java";
      runCommand = "timeout 2s java Main";
    } else {
      return NextResponse.json(
        { output: "Unsupported Language" },
        { status: 400 }
      );
    }

    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, code);

    const inputFilePath = path.join(tempDir, "input.txt");
    fs.writeFileSync(inputFilePath, input || "");

    const dockerCommand = generateDockerCommand(
      tempDir,
      dockerImage,
      compileCommand,
      `${runCommand} < input.txt`
    );

    return new Promise((resolve) => {
      exec(dockerCommand, (error, stdout, stderr) => {
        if (error) {
          resolve(
            NextResponse.json(
              {
                stderr: stderr,
                error: error.message,
                output: null,
              },
              { status: 400 }
            )
          );
        } else {
          resolve(
            NextResponse.json(
              { output: stdout, error: null, stderr: null },
              { status: 200 }
            )
          );
        }
        // Cleanup unique temp directory
        fs.rmSync(tempDir, { recursive: true, force: true });
      });
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { output: "Internal Server Error" },
      { status: 500 }
    );
  }
}