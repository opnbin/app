import fs from "node:fs/promises";
import path from "node:path";
import { Fragment } from "react/jsx-runtime";
import { getPastes } from "@/lib/actions";
import { PasteItem } from "./paste-item";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export async function PastesList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  let pastes: Record<string, any>[] | undefined;
  const result = await getPastes(new URLSearchParams(await searchParams));

  if (result.success) {
    pastes = result.data.pastes;
  } else {
    pastes = undefined;
    console.error(result.error);
  }

  const cat = await fs.readFile(path.join(process.cwd(), "public", "cat.txt"), "utf-8");

  return (
    <div className="flex flex-col gap-0 -mt-2">
      {pastes ? (
        pastes.length !== 0 ? (
          pastes.map((paste, index) => (
            <Fragment key={paste.id}>
              <PasteItem paste={paste} />
              {pastes && index !== pastes.length - 1 && <Separator />}
            </Fragment>
          ))
        ) : (
          <pre className="mt-16 text-muted-foreground mx-auto">{cat}</pre>
        )
      ) : (
        Array.from({ length: 3 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: yes
          <Skeleton key={index} className="h-16 mb-3 opacity-50" />
        ))
      )}
    </div>
  );
}
