import { DotIcon } from "lucide-react";
import { cookies } from "next/headers";
import { ConnectDialog } from "@/components/connect-dialog";
import { Pastes } from "@/components/pastes";
import { SearchBar } from "@/components/search-bar";
import { TopBar } from "@/components/top-bar";
import { links } from "@/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const cookieStore = await cookies();
  const secret = cookieStore.get("opnbin_secret")?.value;

  let loggedIn = false;

  if (secret) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_OPNBIN_BASE_URL}/ping`, {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      });

      if (response.ok) {
        loggedIn = true;
      }
    } catch {
      loggedIn = false;
    }
  }

  if (!loggedIn) {
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
      <Pastes searchParams={searchParams} />
    </div>
  );
}
