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
