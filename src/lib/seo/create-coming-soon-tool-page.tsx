import { ComingSoonTool } from "@/components/tools/ComingSoonTool";
import type { ToolId } from "@/i18n/locales";
import { createToolPage } from "@/lib/seo/create-tool-page";

export function createComingSoonToolPage(toolId: ToolId) {
  function PlannedToolPage() {
    return <ComingSoonTool toolId={toolId} />;
  }

  return createToolPage(toolId, PlannedToolPage);
}
