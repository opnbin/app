"use client";

import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PasteActions({ name, content }: { name: string; content: string }) {
  const [copiedContent, setCopiedContent] = useState(false);

  async function handleCopyContent() {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(true);
    } catch {
      alert("Failed to copy");
    }
  }

  function handleDownload() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (copiedContent) {
      setTimeout(() => {
        setCopiedContent(false);
      }, 3000);
    }
  }, [copiedContent]);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <DownloadIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleCopyContent}>
            {copiedContent ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy Content</TooltipContent>
      </Tooltip>
    </>
  );
}
