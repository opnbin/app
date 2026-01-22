"use server";

import { cookies } from "next/headers";

const OPENBIN_CORE = `${process.env.OPENBIN_CORE}`;

export async function pingApi(secret: string): Promise<string | null> {
  try {
    const response = await fetch(`${OPENBIN_CORE}/ping`, {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });

    if (response.ok) return null;
    return `Request failed (${response.status})`;
  } catch {
    return "Failed to connect";
  }
}

type CreatePasteParams = {
  name: string;
  description?: string;
  language: string;
  content: string;
};

type CreatePasteResult = { success: true; id: string } | { success: false; error: string };

export async function createPaste(params: CreatePasteParams): Promise<CreatePasteResult> {
  const secret = (await cookies()).get("openbin_secret")?.value;
  if (!secret) return { success: false, error: "Not authenticated" };

  try {
    const body: Record<string, string> = {
      name: params.name,
      language: params.language,
      content: params.content,
    };

    if (params.description?.trim()) {
      body.description = params.description.trim();
    }

    const response = await fetch(OPENBIN_CORE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) return { success: false, error: `Request failed (${response.status})` };
    const data = await response.json();
    return { success: true, id: data.id };
  } catch {
    return { success: false, error: "Failed to connect" };
  }
}

type ActionResult = { success: true } | { success: false; error: string };

export async function deletePastes(ids: string[]): Promise<ActionResult> {
  const secret = (await cookies()).get("openbin_secret")?.value;
  if (!secret) return { success: false, error: "Not authenticated" };

  try {
    const response = await fetch(OPENBIN_CORE, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) return { success: false, error: `Request failed (${response.status})` };
    return { success: true };
  } catch {
    return { success: false, error: "Failed to connect" };
  }
}

export type Paste = {
  id: string;
  name: string;
  description: string;
  language: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type GetPastesData = {
  pastes: Paste[];
  page: number;
  limit: number;
  total: number;
};

type GetPastesResult = { success: true; data: GetPastesData } | { success: false; error: string };

export async function getPastes(params: URLSearchParams): Promise<GetPastesResult> {
  const secret = (await cookies()).get("openbin_secret")?.value;
  if (!secret) return { success: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${OPENBIN_CORE}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });

    if (!response.ok) return { success: false, error: `Request failed (${response.status})` };
    const data: GetPastesData = await response.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to connect" };
  }
}

type GetPasteResult = { success: true; data: Paste } | { success: false; error: string };

export async function getPaste(id: string): Promise<GetPasteResult> {
  try {
    const response = await fetch(`${OPENBIN_CORE}/${id}`);

    if (!response.ok) return { success: false, error: `Request failed (${response.status})` };
    const data: Paste = await response.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to connect" };
  }
}

type UpdatePasteParams = {
  name: string;
  description?: string;
  language: string;
  content: string;
};

type UpdatePasteResult = { success: true; data: Paste } | { success: false; error: string };

export async function updatePaste(
  id: string,
  params: UpdatePasteParams,
): Promise<UpdatePasteResult> {
  const secret = (await cookies()).get("openbin_secret")?.value;
  if (!secret) return { success: false, error: "Not authenticated" };

  try {
    const body: Record<string, string> = {
      name: params.name,
      language: params.language,
      content: params.content,
    };

    if (params.description?.trim()) {
      body.description = params.description.trim();
    }

    const response = await fetch(`${OPENBIN_CORE}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) return { success: false, error: `Request failed (${response.status})` };
    const data: Paste = await response.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to connect" };
  }
}
