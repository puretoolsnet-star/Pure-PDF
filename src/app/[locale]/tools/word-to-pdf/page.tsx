import { WordToPdfTool } from "@/components/tools/WordToPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("word-to-pdf", WordToPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
