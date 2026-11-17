export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "kixt.net";

export const SUBDOMAIN_TOOL_LABELS = {
  qr: "QR Generator",
  table: "Table Tools",
  sign: "Sign PDF",
  pdf: "PDF Tools",
} as const;

export const SUBDOMAIN_TOOL_DESCRIPTIONS: Record<KnownSubdomain, string> = {
  qr: "Create and customize QR codes in your browser.",
  table: "Build, edit, and export tables for work and publishing.",
  sign: "Add electronic signatures to documents online.",
  pdf: "Merge, split, compress, and convert PDF files.",
};

export type KnownSubdomain = keyof typeof SUBDOMAIN_TOOL_LABELS;

export const SUBDOMAIN_SLUGS = Object.keys(
  SUBDOMAIN_TOOL_LABELS,
) as KnownSubdomain[];

const SUBDOMAIN_SET = new Set<string>(SUBDOMAIN_SLUGS);

export function isKnownSubdomain(
  value: string,
): value is KnownSubdomain {
  return SUBDOMAIN_SET.has(value);
}

export function isHubSubdomain(subdomain: string): boolean {
  return subdomain === "hub";
}

export function subdomainEyebrow(subdomain: string): string {
  if (isHubSubdomain(subdomain)) {
    return ROOT_DOMAIN;
  }
  return `${subdomain}.${ROOT_DOMAIN}`;
}

export function subdomainAdSlot(subdomain: string): string {
  return `subdomain-${subdomain}`;
}

function humanizeSubdomainSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getSubdomainToolTitle(subdomain: string): string {
  if (isHubSubdomain(subdomain)) {
    return "Kixt Tools Hub";
  }
  if (isKnownSubdomain(subdomain)) {
    return SUBDOMAIN_TOOL_LABELS[subdomain];
  }
  return humanizeSubdomainSlug(subdomain);
}

export function getSubdomainToolDescription(subdomain: string): string {
  if (isHubSubdomain(subdomain)) {
    return "Choose a tool below. Each product lives on its own subdomain.";
  }
  if (isKnownSubdomain(subdomain)) {
    return SUBDOMAIN_TOOL_DESCRIPTIONS[subdomain];
  }
  return `Workspace for ${humanizeSubdomainSlug(subdomain)}. Mount your tool UI in the main column.`;
}

export function getSubdomainFromHost(host: string): string | null {
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";

  if (
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return null;
  }

  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const sub = hostname.slice(0, -(ROOT_DOMAIN.length + 1));
    if (sub && !sub.includes(".")) {
      return sub;
    }
    return null;
  }

  if (hostname.endsWith(".localhost")) {
    const sub = hostname.slice(0, -".localhost".length);
    if (sub && !sub.includes(".")) {
      return sub;
    }
  }

  return null;
}