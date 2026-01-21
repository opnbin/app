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

export function ConnectDialog({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_OPNBIN_BASE_URL}/ping`, {
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
          <DialogTitle>Connect</DialogTitle>
          <DialogDescription>
            Enter the secret key to connect to this Opnbin instance.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-2.5">
            <Label htmlFor="secret">
              <span>
                Secret <span className="text-red-500">*</span>
              </span>
            </Label>
            <Input
              id="secret"
              placeholder="abcd1234"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <p className="text-muted-foreground text-xs leading-none">
              Secret key used to authenticate requests.
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
