"use client";

import Cookies from "js-cookie";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Textarea } from "./ui/textarea";

export function CreatePasteButton({ baseUrl }: { baseUrl: string }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");

  const handleConfirm = async () => {
    try {
      const body: Record<string, any> = {
        name,
        language,
        content,
      };

      const trimmedDescription = description.trim();
      if (trimmedDescription) {
        body.description = trimmedDescription;
      }

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("openbin_secret")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create paste");
      }

      const data = await response.json();
      router.push(`/${data.id}`);
    } catch (error) {
      console.error("Error creating paste:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <PlusIcon />
          New Paste
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Paste</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-2.5">
            <Label htmlFor="paste-name">
              Name
              <span className="text-destructive -ml-0.5">*</span>
            </Label>
            <Input
              id="paste-name"
              placeholder="My awesome paste"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="paste-description">Description</Label>
            <Input
              id="paste-description"
              placeholder="Brief description about this paste"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="paste-language">Language</Label>
            <Input
              id="paste-language"
              placeholder="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="paste-content">Content</Label>
            <Textarea
              id="paste-content"
              placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit..."
              className="h-20 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
