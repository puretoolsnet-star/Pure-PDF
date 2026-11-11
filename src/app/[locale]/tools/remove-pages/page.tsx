import { RemovePagesTool } from "@/components/pdf/tools/RemovePagesTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("remove-pages", RemovePagesTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
