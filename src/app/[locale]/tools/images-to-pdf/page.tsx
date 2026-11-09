import { ImagesToPdfTool } from "@/components/tools/ImagesToPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("images-to-pdf", ImagesToPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
