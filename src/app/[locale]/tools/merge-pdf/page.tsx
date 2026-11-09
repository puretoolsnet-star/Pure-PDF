import { MergePdfTool } from "@/components/tools/MergePdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("merge-pdf", MergePdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
