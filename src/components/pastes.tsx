"use client";

import { ArrowUpRightIcon, CopyIcon, Link2Icon, SearchIcon, Settings2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { buildUrl, type Filters } from "@/utils";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export function Pastes() {
  const [pastes, setPastes] = useState<Record<string, any>[] | undefined>(undefined);
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    const url = buildUrl("http://localhost:8000", filters);

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer your-secret-here",
      },
    })
      .then((res) => res.json())
      .then((data) => setPastes(data.pastes));
  }, [filters]);

  return (
    <>
      <ButtonGroup className="w-full">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={filters.search ?? ""}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setFilters((prev) => ({ ...prev, search: value }));
            }}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Button variant="outline" size="icon">
          <Settings2Icon />
        </Button>
      </ButtonGroup>

      <div className="flex flex-col gap-0">
        {pastes
          ? pastes.map((paste, index) => (
              <Fragment key={paste.id}>
                <div className="flex justify-between gap-4 py-4 items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1.5 items-center">
                      <a
                        className="font-medium text-base tracking-tight hover:underline underline-offset-4"
                        href={`/${paste.id}`}
                      >
                        {paste.name}
                      </a>
                      <ArrowUpRightIcon className="size-3.5 opacity-75" />
                    </div>

                    <span className="text-sm text-muted-foreground">
                      {paste.description ?? "No description"}
                    </span>
                  </div>

                  <div className="flex">
                    <Button variant="ghost" size="icon">
                      <Link2Icon />
                    </Button>

                    <Button variant="ghost" size="icon">
                      <CopyIcon />
                    </Button>
                  </div>
                </div>

                {index !== pastes.length - 1 && <Separator />}
              </Fragment>
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: yes
              <Skeleton key={index} className="h-16 mb-3 opacity-50" />
            ))}
      </div>
    </>
  );
}
