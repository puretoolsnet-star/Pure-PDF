import type { LucideIcon } from "lucide-react";
import {
  FileImage,
  FileSignature,
  FileText,
  FolderOpen,
  GitMerge,
  Images,
  Lock,
  LockOpen,
  Minimize2,
  RotateCw,
  Scissors,
  Trash2,
  Type,
} from "lucide-react";

import type { ToolId } from "@/i18n/locales";

export type ToolCategoryId = "pages" | "convert" | "security";

export type ToolCatalogStatus = "live" | "coming-soon";

export type ToolCatalogEntry = {
  id: ToolId;
  icon: LucideIcon;
  accent: string;
  status: ToolCatalogStatus;
};

export type ToolCategoryCatalog = {
  id: ToolCategoryId;
  defaultOpen: boolean;
  tools: ToolCatalogEntry[];
};

export const TOOL_CATEGORIES: ToolCategoryCatalog[] = [
  {
    id: "pages",
    defaultOpen: true,
    tools: [
      {
        id: "merge-pdf",
        icon: GitMerge,
        accent: "from-cyan-500/25 to-cyan-500/5",
        status: "live",
      },
      {
        id: "split-pdf",
        icon: Scissors,
        accent: "from-violet-500/20 to-violet-500/5",
        status: "live",
      },
      {
        id: "remove-pages",
        icon: Trash2,
        accent: "from-rose-500/20 to-rose-500/5",
        status: "live",
      },
      {
        id: "organize-pdf",
        icon: FolderOpen,
        accent: "from-sky-500/20 to-sky-500/5",
        status: "live",
      },
    ],
  },
  {
    id: "convert",
    defaultOpen: true,
    tools: [
      {
        id: "compress-pdf",
        icon: Minimize2,
        accent: "from-emerald-500/25 to-emerald-500/5",
        status: "live",
      },
      {
        id: "images-to-pdf",
        icon: Images,
        accent: "from-cyan-500/20 to-cyan-500/5",
        status: "live",
      },
      {
        id: "pdf-to-images",
        icon: FileImage,
        accent: "from-teal-500/20 to-teal-500/5",
        status: "live",
      },
      {
        id: "rotate-pdf",
        icon: RotateCw,
        accent: "from-amber-500/20 to-amber-500/5",
        status: "live",
      },
      {
        id: "word-to-pdf",
        icon: FileText,
        accent: "from-emerald-500/15 to-emerald-500/5",
        status: "live",
      },
      {
        id: "text-to-pdf",
        icon: Type,
        accent: "from-blue-500/15 to-blue-500/5",
        status: "live",
      },
    ],
  },
  {
    id: "security",
    defaultOpen: false,
    tools: [
      {
        id: "protect-pdf",
        icon: Lock,
        accent: "from-emerald-500/20 to-emerald-500/5",
        status: "live",
      },
      {
        id: "unlock-pdf",
        icon: LockOpen,
        accent: "from-cyan-500/20 to-cyan-500/5",
        status: "live",
      },
      {
        id: "sign-pdf",
        icon: FileSignature,
        accent: "from-indigo-500/20 to-indigo-500/5",
        status: "live",
      },
    ],
  },
];

export const ALL_CATALOG_TOOL_IDS: ToolId[] = TOOL_CATEGORIES.flatMap((c) =>
  c.tools.map((t) => t.id),
);

export function getCatalogEntry(toolId: ToolId): ToolCatalogEntry | undefined {
  for (const category of TOOL_CATEGORIES) {
    const found = category.tools.find((t) => t.id === toolId);
    if (found) return found;
  }
  return undefined;
}

export const LIVE_TOOL_IDS = ALL_CATALOG_TOOL_IDS.filter(
  (id) => getCatalogEntry(id)?.status === "live",
);

export const COMING_SOON_TOOL_IDS = ALL_CATALOG_TOOL_IDS.filter(
  (id) => getCatalogEntry(id)?.status === "coming-soon",
);
