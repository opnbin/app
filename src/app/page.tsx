import { DotIcon } from "lucide-react";
import { cookies } from "next/headers";
import { ConnectDialog } from "@/components/connect-dialog";
import { PastesList } from "@/components/pastes-list";
import { SearchBar } from "@/components/search-bar";
import { TopBar } from "@/components/top-bar";
import { pingApi } from "@/lib/actions";
import { links } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const cookieStore = await cookies();
  const secret = cookieStore.get("openbin_secret")?.value;

  let connected = false;

  if (secret) {
    const error = await pingApi(secret);

    if (!error) {
      connected = true;
    }
  }

  if (!connected) {
    return (
      <div className="flex justify-center items-center p-6 h-screen">
        <div className="flex flex-col gap-8 items-center h-full">
          <span className="text-3xl font-medium tracking-tight my-auto">A simple 🗑️ pastebin.</span>

          <div className="flex gap-0.5 items-center text-xs text-muted-foreground">
            <ConnectDialog>
              <span className="hover:underline underline-offset-2">Connect</span>
            </ConnectDialog>

            <DotIcon className="size-4" />

            <a
              href={links.github}
              target="_blank"
              rel="noopener"
              className="hover:underline underline-offset-2"
            >
              Source
            </a>

            <DotIcon className="size-4" />

            <a
              href={links.discord}
              target="_blank"
              rel="noopener"
              className="hover:underline underline-offset-2"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4">
      <TopBar />
      <SearchBar />
      <PastesList searchParams={searchParams} />
    </div>
  );
}
