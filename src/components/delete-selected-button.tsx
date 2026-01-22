"use client";

import Cookies from "js-cookie";
import { Trash2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelectionStore } from "@/stores/selection";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function DeleteSelectedButton({ baseUrl }: { baseUrl: string }) {
  const router = useRouter();
  const { selectMode, selectedIds, setSelectMode, clearSelection } = useSelectionStore();

  if (!selectMode) return null;

  async function handleDelete() {
    const secret = Cookies.get("opnbin_secret");

    const response = await fetch(baseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ ids: selectedIds }),
    });

    if (response.ok) {
      clearSelection();
      setSelectMode(false);

      router.refresh();
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <div className="flex gap-2 mr-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setSelectMode(false)}>
            <XIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cancel</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
          >
            <Trash2Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Selected ({selectedIds.length})</TooltipContent>
      </Tooltip>
    </div>
  );
}
