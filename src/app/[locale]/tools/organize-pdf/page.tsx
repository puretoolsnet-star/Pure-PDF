import { OrganizePdfTool } from "@/components/pdf/tools/OrganizePdfTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("organize-pdf", OrganizePdfTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
