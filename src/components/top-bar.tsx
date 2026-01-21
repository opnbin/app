import { Trash2Icon } from "lucide-react";
import { NewPasteButton } from "./new-paste-button";
import { SettingsMenu } from "./settings-menu";

export function TopBar() {
  return (
    <div className="flex gap-4 justify-between items-center">
      <span className="text-xl font-medium tracking-tight flex gap-2 items-center">
        <Trash2Icon className="size-5" />
        opnbin
      </span>

      <div className="flex">
        <SettingsMenu />
        <NewPasteButton />
      </div>
    </div>
  );
}
