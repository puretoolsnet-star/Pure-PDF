import { UnlockPdfTool } from "@/components/pdf/tools/UnlockPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("unlock-pdf", UnlockPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
