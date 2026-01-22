"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { pingApi } from "@/lib/actions";
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

  const handleConfirm = async () => {
    const error = await pingApi(secret);

    if (error) {
      alert(error);
    } else {
      Cookies.set("openbin_secret", secret, { expires: 365, sameSite: "strict" });
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>
          <DialogDescription>
            Enter the secret key to connect to this Openbin instance.
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

          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
