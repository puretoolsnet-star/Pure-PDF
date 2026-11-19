import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ToolWorkspaceLayoutProps = {
  children: ReactNode;
  /** Grid wrapper (inside `main` content area). */
  className?: string;
  workspaceClassName?: string;
  /** @deprecated Ad sidebar removed — kept for call-site compatibility. */
  adSlot?: string;
  adClassName?: string;
};

/** Standard PurePDF tool layout — full-width workspace. */
export function ToolWorkspaceLayout({
  children,
  className,
  workspaceClassName,
}: ToolWorkspaceLayoutProps) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className={cn("relative z-10 min-w-0", workspaceClassName)}>
        {children}
      </div>
    </div>
  );
}