export function generateDockerCommand(
  tempDir: string,
  dockerImage: string,
  compileCommand: string,
  runCommand: string
): string {
  return `docker run --rm -v ${tempDir}:/app --memory=256m --cpus=0.5 ${dockerImage} bash -c "${
    compileCommand ? compileCommand + " && " : ""
  }(/usr/bin/time -v ${runCommand}) 2>&1"`;
}
