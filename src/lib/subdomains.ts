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

export function normalizeSubdomainSlug(value: string): string {
  return value.trim().toLowerCase();
}

export function isKnownSubdomain(
  value: string,
): value is KnownSubdomain {
  return SUBDOMAIN_SET.has(normalizeSubdomainSlug(value));
}

export function isHubSubdomain(subdomain: string): boolean {
  return normalizeSubdomainSlug(subdomain) === "hub";
}

export function subdomainEyebrow(subdomain: string): string {
  const slug = normalizeSubdomainSlug(subdomain);
  if (isHubSubdomain(slug)) {
    return ROOT_DOMAIN;
  }
  return `${slug}.${ROOT_DOMAIN}`;
}

export function subdomainAdSlot(subdomain: string): string {
  return `subdomain-${normalizeSubdomainSlug(subdomain)}`;
}

function humanizeSubdomainSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getSubdomainToolTitle(subdomain: string): string {
  const slug = normalizeSubdomainSlug(subdomain);
  if (isHubSubdomain(slug)) {
    return "Kixt Tools Hub";
  }
  if (isKnownSubdomain(slug)) {
    return SUBDOMAIN_TOOL_LABELS[slug];
  }
  return humanizeSubdomainSlug(slug);
}

export function getSubdomainToolDescription(subdomain: string): string {
  const slug = normalizeSubdomainSlug(subdomain);
  if (isHubSubdomain(slug)) {
    return "Choose a tool below. Each product lives on its own subdomain.";
  }
  if (isKnownSubdomain(slug)) {
    return SUBDOMAIN_TOOL_DESCRIPTIONS[slug];
  }
  return `Workspace for ${humanizeSubdomainSlug(slug)}. Mount your tool UI in the main column.`;
}

/** Single source for `MicroToolLayout` copy + ad slot from the active slug. */
export function getSubdomainPageContext(subdomain: string) {
  const slug = normalizeSubdomainSlug(subdomain);
  return {
    subdomain: slug,
    title: getSubdomainToolTitle(slug),
    description: getSubdomainToolDescription(slug),
    eyebrow: subdomainEyebrow(slug),
    adSlot: subdomainAdSlot(slug),
  };
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
    if (!sub || sub.includes(".")) {
      return null;
    }
    /** `pdf.*` serves the localized PurePDF catalog (same as apex), not `/subdomains/pdf`. */
    if (sub === "pdf" || sub === "www") {
      return null;
    }
    return sub;
  }

  if (hostname.endsWith(".localhost")) {
    const sub = hostname.slice(0, -".localhost".length);
    if (sub && !sub.includes(".")) {
      return sub;
    }
  }

  return null;
}

export function subdomainRoutePath(subdomain: string): string {
  return `/subdomains/${normalizeSubdomainSlug(subdomain)}`;
}