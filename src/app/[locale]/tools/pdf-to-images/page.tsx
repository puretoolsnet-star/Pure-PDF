import { PdfToImgTool } from "@/components/tools/PdfToImgTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("pdf-to-images", PdfToImgTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
