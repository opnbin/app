import {
  ArrowUpRightIcon,
  CopyIcon,
  DotIcon,
  DownloadIcon,
  EditIcon,
  EllipsisIcon,
  Trash2Icon,
} from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  stackoverflowDark,
  // stackoverflowLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatIso, links } from "@/utils";

export default async function Page({ params }: { params: Promise<{ paste: string }> }) {
  const { paste: id } = await params;

  const baseUrl = process.env.OPNBIN_BASE_URL;

  const response = await fetch(`${baseUrl}/${id}`, { method: "GET" });
  const data: Record<string, any> = await response.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight">{data.name}</span>

        <div className="flex">
          <Button variant="ghost" size="icon">
            <DownloadIcon />
          </Button>

          <Button variant="ghost" size="icon">
            <CopyIcon />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <EditIcon />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {data.description && (
        <span className="text-muted-foreground text-sm">{data.description}</span>
      )}

      <div className="rounded-md border bg-card flex flex-col overflow-hidden mt-4 drop-shadow-xl">
        <SyntaxHighlighter
          language={data.language}
          style={stackoverflowDark}
          customStyle={{ padding: "16px" }}
        >
          {data.content}
        </SyntaxHighlighter>
      </div>

      <div className="flex gap-0.5 text-muted-foreground text-xs mt-4">
        <span>Created {formatIso(data.created_at)}</span>

        <DotIcon className="size-4" />

        <a href={links.homepage} target="_blank" className="flex gap-1 items-center" rel="noopener">
          <span>Powered by Opnbin</span>
          <ArrowUpRightIcon className="size-3" />
        </a>
      </div>
    </div>
  );
}
