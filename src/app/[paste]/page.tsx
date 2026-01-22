import { ArrowUpRightIcon, DotIcon } from "lucide-react";
import { PasteActions } from "@/components/paste-view/paste-actions";
import { PasteManageButtons } from "@/components/paste-view/paste-manage-buttons";
import { PasteWindow } from "@/components/paste-view/paste-window";
import { env } from "@/lib/env";
import { formatIso, links } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ paste: string }> }) {
  const { paste: id } = await params;

  const response = await fetch(`${env("OPNBIN_CORE")}/${id}`, {
    method: "GET",
  });

  const data: Record<string, any> = await response.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight">{data.name}</span>

        <div className="flex">
          <PasteActions name={data.name} content={data.content} />
          <PasteManageButtons paste={data} baseUrl={env("OPNBIN_CORE")} />
        </div>
      </div>

      {data.description && (
        <span className="text-muted-foreground text-sm">{data.description}</span>
      )}

      <PasteWindow data={data} />

      <div className="flex gap-0.5 text-muted-foreground text-sm mt-6">
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
