import { RotatePdfTool } from "@/components/pdf/tools/RotatePdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("rotate-pdf", RotatePdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
