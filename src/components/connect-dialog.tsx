"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ConnectDialog({
  children,
  baseUrl,
}: {
  children: ReactNode;
  baseUrl: string | undefined;
}) {
  const router = useRouter();

  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/ping`, {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      });

      if (response.ok) {
        Cookies.set("opnbin_secret", secret, { expires: 365, sameSite: "strict" });

        router.refresh();
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-2.5">
            <Label htmlFor="secret">Secret</Label>
            <Input
              id="secret"
              placeholder="abc123"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <p className="text-muted-foreground text-xs leading-none">
              Secret key used to authenticate requests to the API.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Connecting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
