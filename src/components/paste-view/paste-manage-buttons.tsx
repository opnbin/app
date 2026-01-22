"use client";

import Cookies from "js-cookie";
import { EditIcon, EllipsisIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PasteManageButtons({
  paste,
  baseUrl,
}: {
  paste: Record<string, any>;
  baseUrl: string;
}) {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [name, setName] = useState(paste.name);
  const [description, setDescription] = useState(paste.description || "");
  const [language, setLanguage] = useState(paste.language);
  const [content, setContent] = useState(paste.content);

  useEffect(() => {
    async function checkConnection() {
      const secret = Cookies.get("opnbin_secret");

      if (!secret) return;

      try {
        const response = await fetch(`${baseUrl}/ping`, {
          headers: {
            Authorization: `Bearer ${secret}`,
          },
        });

        if (response.ok) {
          setConnected(true);
        }
      } catch {
        setConnected(false);
      }
    }

    checkConnection();
  }, [baseUrl]);

  const handleEdit = async () => {
    try {
      const response = await fetch(`${baseUrl}/${paste.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("opnbin_secret")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          language,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update paste");
      }

      setEditDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating paste:", error);
    }
  };

  const handleDelete = async () => {
    const secret = Cookies.get("opnbin_secret");

    const response = await fetch(`${baseUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ ids: [paste.id] }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Failed to delete");
    }
  };

  if (!connected) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
            <EditIcon />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Paste</DialogTitle>
            <DialogDescription>Make changes to your paste below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="grid gap-2.5">
              <Label htmlFor="edit-paste-name">
                Name
                <span className="text-destructive -ml-0.5">*</span>
              </Label>
              <Input
                id="edit-paste-name"
                placeholder="My awesome paste"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="edit-paste-description">Description</Label>
              <Input
                id="edit-paste-description"
                placeholder="Brief description about this paste"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="edit-paste-language">Language</Label>
              <Input
                id="edit-paste-language"
                placeholder="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="edit-paste-content">Content</Label>
              <Textarea
                id="edit-paste-content"
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

            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
