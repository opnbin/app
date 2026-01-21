"use client";

import Cookies from "js-cookie";
import {
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  SettingsIcon,
  SquareCheckBigIcon,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSelectionStore } from "@/stores/selection";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function SettingsMenu() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setSelectMode } = useSelectionStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <SettingsIcon />
          Settings
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunIcon />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <SunIcon />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <MoonIcon />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <MonitorIcon />
                Auto
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem onClick={() => setSelectMode(true)}>
          <SquareCheckBigIcon />
          Select
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            Cookies.remove("opnbin_secret");
            router.refresh();
          }}
        >
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
