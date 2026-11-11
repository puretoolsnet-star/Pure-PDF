import { ProtectPdfTool } from "@/components/pdf/tools/ProtectPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("protect-pdf", ProtectPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
