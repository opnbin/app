import { Trash2Icon } from "lucide-react";
import { env } from "@/lib/env";
import { CreatePasteButton } from "./create-paste-button";
import { DeleteSelectedButton } from "./delete-selected-button";
import { SettingsMenu } from "./settings-menu";

export async function TopBar() {
  return (
    <div className="flex gap-4 justify-between items-center">
      <a href="/" className="text-xl font-medium tracking-tight flex gap-2 items-center">
        <Trash2Icon className="size-5" />
        opnbin
      </a>

      <div className="flex">
        <DeleteSelectedButton baseUrl={env("OPNBIN_CORE")} />
        <SettingsMenu />
        <CreatePasteButton baseUrl={env("OPNBIN_CORE")} />
      </div>
    </div>
  );
}
