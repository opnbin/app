"use client";

import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  stackoverflowDark,
  stackoverflowLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export function PasteWindow({ data }: { data: any }) {
  const { theme } = useTheme();

  return (
    <div className="rounded-md border bg-card flex flex-col overflow-hidden mt-6 drop-shadow-xl">
      <SyntaxHighlighter
        language={data.language}
        style={theme === "dark" ? stackoverflowDark : stackoverflowLight}
        customStyle={{ padding: "16px" }}
      >
        {data.content}
      </SyntaxHighlighter>
    </div>
  );
}
