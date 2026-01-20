"use client";

import { LogOutIcon, MonitorIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
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
              <DropdownMenuItem>
                <MonitorIcon />
                Auto
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SunIcon />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MoonIcon />
                Dark
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
