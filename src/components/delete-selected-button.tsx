"use client";
import { Trash2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletePastes } from "@/lib/actions";
import { useSelectionStore } from "@/stores/selection";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function DeleteSelectedButton() {
  const router = useRouter();
  const { selectMode, selectedIds, setSelectMode, clearSelection } = useSelectionStore();

  if (!selectMode) return null;

  async function handleDelete() {
    const result = await deletePastes(selectedIds);

    if (result.success) {
      clearSelection();
      setSelectMode(false);

      router.refresh();
    } else {
      alert(result.error);
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
