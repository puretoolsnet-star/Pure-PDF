import { SplitPdfTool } from "@/components/pdf/tools/SplitPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("split-pdf", SplitPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
