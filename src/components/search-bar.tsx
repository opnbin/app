"use client";

import { format } from "date-fns";
import { CalendarIcon, SearchIcon, Settings2Icon, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/search-params";
import { PaginationStuff } from "./pagination-stuff";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function SearchBar() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="flex gap-2">
      <ButtonGroup className="w-full">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            defaultValue={searchParams.get("search") ?? ""}
            onChange={(e) => {
              updateSearchParams({ search: e.currentTarget.value });
            }}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings2Icon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col gap-6">
            <div className="grid gap-2.5">
              <Label htmlFor="language">Language</Label>
              <Input
                placeholder="python"
                id="language"
                defaultValue={searchParams.get("language") ?? ""}
                onChange={(e) => updateSearchParams({ language: e.currentTarget.value })}
              />
            </div>

            <div className="grid gap-2.5 w-full">
              <Label htmlFor="created-before">Created Before</Label>
              <ButtonGroup className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!searchParams.get("created_before")}
                      className="data-[empty=true]:text-muted-foreground justify-start font-normal flex-1"
                      id="created-before"
                    >
                      <CalendarIcon />
                      {(() => {
                        const v = searchParams.get("created_before");
                        return v ? format(new Date(v), "PPP") : "Pick a date";
                      })()}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={(() => {
                        const v = searchParams.get("created_before");
                        return v ? new Date(v) : undefined;
                      })()}
                      onSelect={(v) => updateSearchParams({ created_before: v?.toISOString() })}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateSearchParams({ created_before: null })}
                >
                  <XIcon />
                </Button>
              </ButtonGroup>
            </div>

            <div className="grid gap-2.5 w-full">
              <Label htmlFor="created-after">Created After</Label>
              <ButtonGroup className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!searchParams.get("created_after")}
                      className="data-[empty=true]:text-muted-foreground justify-start font-normal flex-1"
                      id="created-after"
                    >
                      <CalendarIcon />
                      {(() => {
                        const v = searchParams.get("created_after");
                        return v ? format(new Date(v), "PPP") : "Pick a date";
                      })()}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={(() => {
                        const v = searchParams.get("created_after");
                        return v ? new Date(v) : undefined;
                      })()}
                      onSelect={(v) => updateSearchParams({ created_after: v?.toISOString() })}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateSearchParams({ created_after: null })}
                >
                  <XIcon />
                </Button>
              </ButtonGroup>
            </div>
          </PopoverContent>
        </Popover>
      </ButtonGroup>

      <PaginationStuff />
    </div>
  );
}
