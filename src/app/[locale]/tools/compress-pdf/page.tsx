import { CompressPdfTool } from "@/components/tools/CompressPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("compress-pdf", CompressPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
