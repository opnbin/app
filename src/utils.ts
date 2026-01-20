export interface Filters {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  createdBefore?: string;
  createdAfter?: string;
}

export function buildUrl(baseUrl: string, filters: Filters) {
  const url = new URL(baseUrl);

  const paramMap: Record<string, string | number | undefined> = {
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
    language: filters.language,
    created_before: filters.createdBefore,
    created_after: filters.createdAfter,
  };

  for (const [key, value] of Object.entries(paramMap)) {
    if (value != null) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

export function formatIso(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export const links = {
  github: "https://github.com/opnbin",
  homepage: "https://opnbin.ronykax.com",
  discord: "https://discord.gg/CU5SUGNvtH",
};
