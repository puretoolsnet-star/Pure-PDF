import { SignPdfTool } from "@/components/pdf/tools/SignPdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("sign-pdf", SignPdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
