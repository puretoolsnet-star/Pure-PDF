import type { Locale } from "@/i18n/locales";
import { getSiteUrl } from "@/lib/seo/site";

const PUREQR_BASE =
  process.env.NEXT_PUBLIC_PUREQR_URL?.replace(/\/$/, "") ?? "https://pureqr.app";
const PURESIGN_BASE =
  process.env.NEXT_PUBLIC_PURESIGN_URL?.replace(/\/$/, "") ?? "https://puresign.app";
const PURETABLE_BASE =
  process.env.NEXT_PUBLIC_PURETABLE_URL?.replace(/\/$/, "") ?? "https://puretable.app";

type EcosystemProjectId = "purepdf" | "pureQr" | "pureSign" | "pureTable";

/** Preserves app locale segment in URLs (uk, en, pl, de, es, fr). */
export function ecosystemExternalUrl(
  projectId: Exclude<EcosystemProjectId, "purepdf">,
  locale: Locale,
): string {
  const base =
    projectId === "pureQr"
      ? PUREQR_BASE
      : projectId === "pureSign"
        ? PURESIGN_BASE
        : PURETABLE_BASE;
  return `${base}/${locale}`;
}

export function ecosystemPurePdfOrigin(): string {
  return getSiteUrl();
}
