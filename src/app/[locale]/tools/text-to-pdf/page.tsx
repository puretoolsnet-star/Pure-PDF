import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("text-to-pdf", TextToPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
