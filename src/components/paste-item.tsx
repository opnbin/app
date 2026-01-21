"use client";

import { ArrowUpRightIcon, CheckIcon, CopyIcon, Link2Icon } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const monoFont = Geist_Mono();

export function PasteItem({ paste }: { paste: any }) {
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  async function handleCopyContent(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(true);
    } catch {
      alert("Failed to copy");
    }
  }

  async function handleCopyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
    } catch {
      alert("Failed to copy");
    }
  }

  useEffect(() => {
    if (copiedContent) {
      setTimeout(() => {
        setCopiedContent(false);
      }, 3000);
    }

    if (copiedLink) {
      setTimeout(() => {
        setCopiedLink(false);
      }, 3000);
    }
  }, [copiedContent, copiedLink]);

  return (
    <div className="flex justify-between gap-4 py-4 items-center">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1.5 items-center">
          <a
            className="font-medium text-base tracking-tight hover:underline underline-offset-4"
            href={`/${paste.id}`}
          >
            {paste.name}
          </a>
          <ArrowUpRightIcon className="size-3.5 opacity-75" />
        </div>

        <span className="text-sm text-muted-foreground">
          {paste.description ?? "No description"}
        </span>
      </div>

      <div className="flex items-center">
        <Badge className={`mr-2 font-mono ${monoFont.className}`} variant="secondary">
          {paste.language}
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleCopyLink(new URL(paste.id, origin).toString())}
        >
          {copiedLink ? <CheckIcon /> : <Link2Icon />}
        </Button>

        <Button variant="ghost" size="icon" onClick={() => handleCopyContent(paste.content)}>
          {copiedContent ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
    </div>
  );
}
