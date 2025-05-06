export const Languages = ["cpp", "python", "java","c"] as const;
export type Language = (typeof Languages)[number];

const defaultCppCode = "#include <bits/stdc++.h>\nusing namespace std;\n#define ll long long\n\nvoid solve()\n{\n\t//Your code goes here\n}\n\nint main() {\n\tll t;\n\tcin >> t;\n\twhile (t--)\n\t{\n\t\tsolve();\n\t}\n\treturn 0;\n}";

const defaultCCode = "#include <stdio.h>\n\nvoid solve()\n{\n\t//Your code goes here\n}\n\nint main() {\n\tint t;\n\tscanf(\"%d\", &t);\n\twhile (t--)\n\t{\n\t\tsolve();\n\t}\n\treturn 0;\n}";

const defaultPythonCode = "def solve():\n\t#Your code goes here\n\n\nt = int(input())\nfor _ in range(t):\n\tsolve()";

const defaultJavaCode = "import java.util.*;\n\npublic class Main {\n\tpublic static void solve() {\n\t\t//Your code goes here\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tScanner sc = new Scanner(System.in);\n\t\tint t = sc.nextInt();\n\t\twhile (t-- > 0) {\n\t\t\tsolve();\n\t\t}\n\t\tsc.close();\n\t}\n}";

export const defaultCodeMap: Record<Language, string> = {
  cpp: defaultCppCode,
  python: defaultPythonCode,
  java: defaultJavaCode,
  c: defaultCCode,
};