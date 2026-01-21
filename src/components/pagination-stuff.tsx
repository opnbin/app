import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/search-params";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function PaginationStuff() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          updateSearchParams({
            page: Math.max(1, Number(searchParams.get("page") ?? 1) - 1).toString(),
          })
        }
      >
        <ArrowLeftIcon />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{searchParams.get("page") ?? 1}</Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 w-fit">
          <div className="flex gap-4 justify-between">
            <Label htmlFor="page">Page</Label>
            <Input
              type="number"
              className="w-24"
              placeholder="1"
              id="page"
              onChange={(e) => updateSearchParams({ page: e.target.value })}
            />
          </div>

          <div className="flex gap-4 justify-between">
            <Label htmlFor="limit">Limit</Label>
            <Input
              type="number"
              className="w-24"
              placeholder="20"
              id="limit"
              onChange={(e) => updateSearchParams({ limit: e.target.value })}
            />
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          updateSearchParams({ page: (Number(searchParams.get("page") ?? 1) + 1).toString() })
        }
      >
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  );
}
