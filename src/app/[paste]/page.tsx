import { ArrowUpRightIcon, DotIcon } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PasteActions } from "@/components/paste-view/paste-actions";
import { PasteManageButtons } from "@/components/paste-view/paste-manage-buttons";
import { PasteWindow } from "@/components/paste-view/paste-window";
import { getPaste } from "@/lib/actions";
import { formatIso, links } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ paste: string }>;
}): Promise<Metadata> {
  const { paste: id } = await params;
  const result = await getPaste(id);

  if (!result.success) {
    return {
      title: "Paste not found",
      description: "The paste you are looking for does not exist.",
      openGraph: {
        title: "Paste not found",
        description: "The paste you are looking for does not exist.",
        url: `${process.env.OPENBIN_CORE}/${id}`,
        siteName: "Openbin",
        type: "website",
      },
    };
  }

  const { data } = result;

  return {
    title: data.name,
    description: data.description,
    openGraph: {
      title: data.name,
      description: data.description,
      url: `${process.env.OPENBIN_CORE}/${data.id}`,
      siteName: "Openbin",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ paste: string }> }) {
  const { paste: id } = await params;
  const result = await getPaste(id);

  if (!result.success) {
    redirect("/");
  }

  const { data } = result;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight">{data.name}</span>

        <div className="flex">
          <PasteActions name={data.name} content={data.content} />
          <PasteManageButtons paste={data} />
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
          <span>Powered by Openbin</span>
          <ArrowUpRightIcon className="size-3" />
        </a>
      </div>
    </div>
  );
}
