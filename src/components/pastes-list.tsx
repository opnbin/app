import fs from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { Fragment } from "react/jsx-runtime";
import { PasteItem } from "./paste-item";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export async function PastesList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const url = new URL(`${process.env.NEXT_PUBLIC_OPNBIN_BASE_URL}`);
  url.search = new URLSearchParams(await searchParams).toString();

  const cookieStore = await cookies();
  let pastes: Record<string, any>[] | undefined;

  await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${cookieStore.get("opnbin_secret")?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      pastes = data.pastes;
    });

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
